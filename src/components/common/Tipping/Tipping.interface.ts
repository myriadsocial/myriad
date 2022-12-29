import {BN} from '@polkadot/util';

import {BalanceDetail} from 'src/interfaces/balance';
import {Comment} from 'src/interfaces/comment';
import {Currency} from 'src/interfaces/currency';
import {ReferenceType} from 'src/interfaces/interaction';
import {People} from 'src/interfaces/people';
import {Post} from 'src/interfaces/post';
import {User} from 'src/interfaces/user';
import {WalletDetail} from 'src/interfaces/wallet';

export interface UserWithWalletDetail extends User {
  walletDetail?: WalletDetail;
}

export interface PeopleWithWalletDetail extends People {
  walletDetail?: WalletDetail;
}

export type TippingOptions = {
  receiver: UserWithWalletDetail | PeopleWithWalletDetail;
  reference: Post | Comment | User | ExclusiveContentWithPrices;
  referenceType: ReferenceType;
  contentReferenceId?: string;
};
export interface TippingProviderProps {
  anonymous: boolean;
  sender?: User;
}

export type SendTipProps = {
  receiver: UserWithWalletDetail | PeopleWithWalletDetail;
  reference: Post | Comment | User | ExclusiveContentWithPrices;
  referenceType: ReferenceType;
  defaultCurrency: BalanceDetail;
  balances: BalanceDetail[];
  contentReferenceId?: string;
  onSuccess: (
    currency: BalanceDetail,
    explorerURL: string,
    transactionHash: string,
    amount: BN,
  ) => Promise<void> | void;
};

export interface ExclusiveContent {
  content?: {
    text: string;
    rawText: string;
  };
  id: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExclusiveContentPrice {
  id: string;
  amount: number;
  currencyId: string;
  unlockableContentId: string;
  currency: Currency;
}

export type ExclusiveContentWithPrices = ExclusiveContent & {
  user?: User;
  prices?: ExclusiveContentPrice[];
};
