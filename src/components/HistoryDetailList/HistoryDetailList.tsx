import React, {useState, useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import {Transaction} from '../../interfaces/transaction';
import {
  historyAmountSortOptions,
  historyTransactionSortOptions,
  historyCoinSortOptions,
} from '../Timeline/default';
import {Avatar, AvatarSize} from '../atoms/Avatar';
import {MenuOptions} from '../atoms/DropdownMenu';
import {DropdownMenu} from '../atoms/DropdownMenu';
import {useStyles} from './history-detail-list.styles';

import _ from 'lodash';
import {Loading} from 'src/components/atoms/Loading';
import {formatUsd} from 'src/helpers/balance';
import {timeAgo} from 'src/helpers/date';
import {parseScientificNotatedNumber} from 'src/helpers/number';
import {useExchangeRate} from 'src/hooks/use-exchange-rate.hook';
import {CurrencyId} from 'src/interfaces/currency';

type metaTrxProps = {
  currentPage: number;
  itemsPerPage: number;
  nextPage?: number;
  totalPageCount: number;
};

type HistoryDetailListProps = {
  allTxs: Transaction[];
  outboundTxs: Transaction[];
  inboundTxs: Transaction[];
  isLoading: boolean;
  userId: string;
  meta: metaTrxProps;
  nextPage: () => void;
};

export const HistoryDetailList: React.FC<HistoryDetailListProps> = props => {
  const {allTxs, meta, isLoading, inboundTxs, outboundTxs, userId, nextPage} = props;
  const {loading, exchangeRates} = useExchangeRate();

  useEffect(() => {
    const newArray = allTxs.map(tx => ({
      id: tx.currency.id,
      title: tx.currency.id,
    }));
    const updatedSortOptions = getUniqueListBy(newArray, 'id');

    //@ts-ignore
    setSortOptions((oldSortOptions: MenuOptions[]) => [...oldSortOptions, ...updatedSortOptions]);
  }, []);

  useEffect(() => {
    setDefaultTxs(allTxs);
  }, [allTxs]);

  const [sortOptions, setSortOptions] = useState(historyCoinSortOptions);

  const [defaultTxs, setDefaultTxs] = useState<Transaction[]>([]);

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const getUniqueListBy = (arr: Array<any>, key: string) => {
    const newArr = new Map(arr.map(item => [item[key], item]));

    return Array.from(newArr).values();
  };

  const getConversion = (currencyId: string) => {
    if (loading) {
      return 0;
    }

    const found = exchangeRates.find(exchangeRate => exchangeRate.id === currencyId);

    if (found) return found.price;
    return 0;
  };

  const handleSortChange = (sort: string) => {
    switch (sort) {
      case 'highest': {
        const sortedHighest = _.orderBy(defaultTxs, 'amount', 'desc');
        setDefaultTxs(sortedHighest);
        break;
      }

      case 'latest': {
        const sortedLatest = _.orderBy(defaultTxs, 'createdAt', 'desc');
        setDefaultTxs(sortedLatest);
        break;
      }

      case 'lowest': {
        const sortedLatest = _.orderBy(defaultTxs, 'amount', 'asc');
        setDefaultTxs(sortedLatest);
        break;
      }

      default: {
        break;
      }
    }
  };

  const handleTransactionChange = (filterByTransactionDirection: string) => {
    switch (filterByTransactionDirection) {
      case 'received': {
        setDefaultTxs(inboundTxs);
        break;
      }

      case 'sent': {
        setDefaultTxs(outboundTxs);
        break;
      }

      case 'failed': {
        setDefaultTxs(outboundTxs);
        break;
      }

      default: {
        setDefaultTxs(allTxs);
        break;
      }
    }
  };

  const handleCurrencyChange = (filterByCurrency: string) => {
    switch (filterByCurrency) {
      case CurrencyId.ACA: {
        const filteredByACA = _.filter(allTxs, {currencyId: 'ACA'});
        setDefaultTxs(filteredByACA);
        break;
      }

      case CurrencyId.DOT: {
        const filteredByDOT = _.filter(allTxs, {currencyId: 'DOT'});
        setDefaultTxs(filteredByDOT);
        break;
      }

      case CurrencyId.AUSD: {
        const filteredByAUSD = _.filter(allTxs, {currencyId: 'AUSD'});
        setDefaultTxs(filteredByAUSD);
        break;
      }

      case CurrencyId.MYRIA: {
        const filteredByMYRIA = _.filter(allTxs, {currencyId: 'MYRIA'});
        setDefaultTxs(filteredByMYRIA);
        break;
      }

      default: {
        setDefaultTxs(allTxs);
        break;
      }
    }
  };

  const classes = useStyles();

  const namePlaceholder = 'Unknown Myrian';

  return (
    <>
      <div className={classes.headerActionWrapper}>
        <DropdownMenu
          title={'Sort'}
          options={historyAmountSortOptions}
          onChange={handleSortChange}
        />
        <div className={classes.sortCoin}>
          <DropdownMenu title={'Coin'} options={sortOptions} onChange={handleCurrencyChange} />
        </div>
        <DropdownMenu
          title={'Transaction'}
          options={historyTransactionSortOptions}
          onChange={handleTransactionChange}
        />
      </div>
      <TableContainer component={List}>
        <Table className={classes.root} aria-label="history details table">
          <TableBody>
            {isLoading && defaultTxs.length === 0 && (
              <TableRow className={classes.loading}>
                <CircularProgress />
              </TableRow>
            )}
            <InfiniteScroll
              dataLength={allTxs.length}
              hasMore={meta.currentPage < meta.totalPageCount}
              next={nextPage}
              loader={<Loading />}
              className={classes.infiniteScroll}>
              {defaultTxs.length > 0 &&
                defaultTxs.map(tx => (
                  <TableRow key={tx.id} className={classes.tableRow}>
                    <TableCell component="th" scope="row" className={classes.tableCell}>
                      <Avatar
                        size={AvatarSize.MEDIUM}
                        alt={
                          tx.toWallet.user?.id === userId
                            ? tx.fromWallet.user?.id
                            : tx.toWallet.user?.id
                        }
                        src={
                          tx.toWallet.user?.id === userId
                            ? tx.fromWallet.user?.profilePictureURL ?? namePlaceholder
                            : tx.toWallet.user?.profilePictureURL ?? namePlaceholder
                        }
                        name={
                          tx.toWallet.user?.id === userId
                            ? tx.fromWallet.user?.name ?? namePlaceholder
                            : tx.toWallet.user?.name ?? namePlaceholder
                        }
                      />

                      <div>
                        <Typography variant="body1">
                          {tx.toWallet.user?.id === userId
                            ? tx.fromWallet.user?.name ?? namePlaceholder
                            : tx.toWallet.user?.name ?? namePlaceholder}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {timeAgo(tx.createdAt)}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      {tx.toWallet.user?.id === userId && (
                        <div className={classes.received}>
                          <Typography variant="caption">Received</Typography>
                        </div>
                      )}
                      {tx.fromWallet.user?.id === userId && (
                        <div className={classes.sent}>
                          <Typography variant="caption">Sent</Typography>
                        </div>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <div className={classes.currencyDetailWrapper}>
                        <div>
                          {tx.toWallet.user?.id === userId && (
                            <Typography variant="h5" className={classes.textAmountReceived}>
                              {parseScientificNotatedNumber(tx.amount)} {tx.currency.id}
                            </Typography>
                          )}
                          {tx.fromWallet.user?.id === userId && (
                            <Typography variant="h5" className={classes.textAmountSent}>
                              {parseScientificNotatedNumber(tx.amount)} {tx.currency.id}
                            </Typography>
                          )}
                          <Typography variant="caption" color="textSecondary">
                            {`~${formatUsd(tx.amount, getConversion(tx.currencyId))} USD`}
                          </Typography>
                        </div>
                        <div>
                          <Avatar
                            name={tx.currency.id}
                            size={AvatarSize.TINY}
                            alt={tx.currency.id}
                            src={tx.currency.image}
                          />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </InfiniteScroll>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
