import React, {useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';

import {useSession} from 'next-auth/react';

import {Backdrop, CircularProgress} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {BN, BN_ZERO} from '@polkadot/util';

import {TermOfService} from '../TermOfService';
import ShowIf from '../show-if.component';
import {ExclusiveContentWithPrices, SendTipProps} from './Tipping.interface';
import {useStyles} from './Tipping.style';
import {TippingInfo} from './render/Info';
import {InputAmount} from './render/InputAmount';
import {Summary} from './render/Summary';
import {TIPPING_STORAGE_KEY} from './render/Tipping.success';

import localforage from 'localforage';
import {Button, ButtonVariant} from 'src/components/atoms/Button';
import {CurrencyOptionComponent} from 'src/components/atoms/CurrencyOption';
import {ListItemComponent} from 'src/components/atoms/ListItem';
import {formatBalance} from 'src/helpers/balance';
import {strToJson, toBigNumber} from 'src/helpers/string';
import {useWallet} from 'src/hooks/use-wallet-hook';
import {BalanceDetail} from 'src/interfaces/balance';
import {ReferenceType} from 'src/interfaces/interaction';
import {CURRENT_NETWORK_KEY, Network, NetworkIdEnum} from 'src/interfaces/network';
import {WalletTypeEnum} from 'src/interfaces/wallet';
import i18n from 'src/locale';
import {RootState} from 'src/reducers';
import {UserState} from 'src/reducers/user/reducer';

const INITIAL_AMOUNT = new BN(-1);

export const Tipping: React.FC<SendTipProps> = props => {
  const {
    receiver,
    reference,
    referenceType,
    balances,
    defaultCurrency,
    onSuccess,
    contentReferenceId,
  } = props;

  const classes = useStyles();
  const {isSignerLoading, sendTip, payUnlockableContent} = useWallet();
  const {data: session} = useSession();

  const {currencies, networks} = useSelector<RootState, UserState>(state => state.userState);
  const [amount, setAmount] = useState<BN>(INITIAL_AMOUNT);
  const [transactionFee, setTransactionFee] = useState<BN>(INITIAL_AMOUNT);
  const [assetMinBalance, setAssetMinBalance] = useState<BN>(BN_ZERO);
  const [balanceList, setBalanceList] = useState<BalanceDetail[]>(balances);

  const [currency, setCurrency] = useState<BalanceDetail>(defaultCurrency);
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [loadingFee, setLoadingFee] = useState(true);
  const [tippingAmountValid, setTippingAmountValid] = useState(false);
  const [minInput, setMinInput] = useState<number>(0);

  const walletType = session?.user?.walletType as WalletTypeEnum;
  const networkType = session?.user?.networkType as NetworkIdEnum;
  const isTipping = referenceType !== ReferenceType.EXCLUSIVE_CONTENT;

  useEffect(() => {
    if (isTipping) return setBalanceList(balances);
    const contentPrice = reference as ExclusiveContentWithPrices;
    const currencyIds: string[] = [];
    const price = {amount: 0};

    contentPrice.prices.forEach(e => {
      currencyIds.push(e.currencyId);
      if (e.currencyId === currency.id) {
        price.amount = e.amount;
      }
    });

    const filterBalances = balances.filter(e => currencyIds.includes(e.id));
    setMinInput(price.amount);
    setBalanceList(filterBalances);
  }, [isTipping, currency, balances, reference]);

  const nativeSymbol = useMemo(() => {
    const nativeCurrency = currencies.find(e => e.native);

    return nativeCurrency?.symbol ?? currency.symbol;
  }, [walletType]);

  const getAddressByUser = () => {
    return session?.user?.address ?? null;
  };

  const handleChangeAgreement = (accepted: boolean) => {
    setAgreementChecked(accepted);
  };

  const calculateTransactionFee = async (selected: BalanceDetail) => {
    const senderAddress = getAddressByUser();

    if (!receiver.walletDetail || !senderAddress) return;

    setLoadingFee(true);

    const estimatedFee = new BN((0.0142 * Math.pow(10, 18)).toString());
    const minBalance = new BN((0.01 * Math.pow(10, 18)).toString());

    // TODO: Fixed estimated fee
    // const {estimatedFee, minBalance} = await getEstimatedFee(receiver.walletDetail, selected);

    setLoadingFee(false);
    setTransactionFee(estimatedFee);

    if (isTipping) setAssetMinBalance(minBalance);
    else {
      const exclusiveContentWithPrices = reference as ExclusiveContentWithPrices;
      setAssetMinBalance(toBigNumber(exclusiveContentWithPrices.prices[0].amount.toString(), 10));
    }
  };

  const handleChangeCurrency = async (selected: BalanceDetail) => {
    if (selected.id === currency.id) return;

    // reset tipping data
    setCurrency(selected);
    setAmount(INITIAL_AMOUNT);
    setTransactionFee(INITIAL_AMOUNT);
    setAssetMinBalance(BN_ZERO);

    calculateTransactionFee(selected);
  };

  const handleAmountChange = (amount: BN, valid: boolean) => {
    if (amount.gt(BN_ZERO) && valid) {
      setAmount(amount);
    } else {
      setAmount(INITIAL_AMOUNT);
    }

    setTippingAmountValid(valid);
  };

  const signTransaction = async () => {
    if (amount.lte(BN_ZERO)) return;

    const senderAddress = getAddressByUser();

    if (!receiver.walletDetail || !senderAddress) return;

    let stringifyNetwork = window.localStorage.getItem(CURRENT_NETWORK_KEY);

    if (!stringifyNetwork) {
      const network = networks.find(e => e.id === networkType);
      if (!network) return;
      stringifyNetwork = JSON.stringify(network);
      window.localStorage.setItem(CURRENT_NETWORK_KEY, stringifyNetwork);
    }

    const currentNetwork = strToJson<Network>(stringifyNetwork);

    if (currency.native) receiver.walletDetail.ftIdentifier = 'native';
    else receiver.walletDetail.ftIdentifier = currency.referenceId;

    if (isTipping) {
      const attributes = {
        from: senderAddress,
        to: receiver.id,
        amount,
        currency: {...currency, network: currentNetwork},
        walletDetail: receiver.walletDetail,
        type: null,
        referenceId: null,
      };

      // not direct tipping
      if ([ReferenceType.POST, ReferenceType.COMMENT].includes(referenceType)) {
        Object.assign(attributes, {
          type: referenceType,
          referenceId: reference.id,
        });
      }

      const storageAttribute = {
        attributes,
        receiver,
        reference,
        referenceType,
        amount: formatBalance(amount, currency.decimal),
      };

      await localforage.setItem(TIPPING_STORAGE_KEY, storageAttribute);

      sendTip(
        receiver.walletDetail,
        amount,
        currency,
        attributes.type,
        attributes.referenceId,
        hash => {
          onSuccess(currency, currentNetwork?.explorerURL, hash, attributes.amount);

          setAmount(INITIAL_AMOUNT);
          setTransactionFee(INITIAL_AMOUNT);
        },
      );
    } else {
      payUnlockableContent(
        receiver.walletDetail,
        amount,
        currency,
        referenceType,
        contentReferenceId,
        hash => {
          onSuccess(currency, currentNetwork?.explorerURL, hash, amount);

          setAmount(INITIAL_AMOUNT);
          setTransactionFee(INITIAL_AMOUNT);
        },
      );
    }
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.subHeaderSection}>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <Typography className={classes.subHeader}>
              {i18n.t('Tipping.Modal_Main.Balance')}
            </Typography>
          </Grid>
          <Grid item>
            <ShowIf condition={isTipping}>
              <TippingInfo />
            </ShowIf>
          </Grid>
        </Grid>
        <ListItemComponent
          avatar={currency.image}
          title={currency.symbol}
          subtitle={+currency.freeBalance === 0 ? '0' : parseFloat(currency.freeBalance.toFixed(4))}
          action={
            <CurrencyOptionComponent onSelect={handleChangeCurrency} balanceDetails={balanceList} />
          }
        />

        <form className={classes.formRoot} autoComplete="off">
          <InputAmount
            defaultValue={amount}
            placeholder={i18n.t('Tipping.Modal_Main.Tip_Amount')}
            decimal={currency.decimal}
            fee={transactionFee}
            minBalance={assetMinBalance}
            maxValue={+currency.freeBalance}
            length={10}
            currencyId={currency.symbol}
            onChange={handleAmountChange}
            minInput={minInput}
          />
          <ShowIf condition={!isTipping}>
            <Typography variant="subtitle2" color="textSecondary">
              Minimal Input : {minInput}
            </Typography>
          </ShowIf>

          <Summary
            amount={amount}
            transactionFee={transactionFee}
            receiver={receiver}
            currency={currency}
            loadingFee={loadingFee}
            nativeSymbol={nativeSymbol}
            isTipping={isTipping}
          />

          <div className={classes.formControls}>
            <TermOfService
              about={i18n.t('Tipping.Modal_Main.About')}
              onChange={handleChangeAgreement}
            />

            <Button
              isDisabled={
                !agreementChecked || amount.lte(BN_ZERO) || loadingFee || !tippingAmountValid
              }
              variant={ButtonVariant.CONTAINED}
              onClick={signTransaction}>
              {i18n.t('Tipping.Modal_Main.Btn_Send_Tip')}
            </Button>
          </div>
        </form>
      </div>

      <Backdrop className={classes.backdrop} open={isSignerLoading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </Paper>
  );
};

export default Tipping;
