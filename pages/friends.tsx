import React from 'react';
import {useSelector} from 'react-redux';

import {getSession} from 'next-auth/client';
import getConfig from 'next/config';
import Head from 'next/head';

import {FriendMenuComponent} from 'src/components/FriendsMenu/FriendMenu';
import {TopNavbarComponent, SectionTitle} from 'src/components/atoms/TopNavbar';
import {DefaultLayout} from 'src/components/template/Default/DefaultLayout';
import {setHeaders} from 'src/lib/api/base';
import {healthcheck} from 'src/lib/api/healthcheck';
import i18n from 'src/locale';
import {RootState} from 'src/reducers';
import {getUserCurrencies} from 'src/reducers/balance/actions';
import {fetchAvailableToken} from 'src/reducers/config/actions';
import {fetchExchangeRates} from 'src/reducers/exchange-rate/actions';
import {fetchFriend} from 'src/reducers/friend/actions';
import {FriendState} from 'src/reducers/friend/reducer';
import {countNewNotification} from 'src/reducers/notification/actions';
import {
  setAnonymous,
  fetchConnectedSocials,
  fetchUser,
  fetchUserExperience,
} from 'src/reducers/user/actions';
import {wrapper} from 'src/store';
import {ThunkDispatchAction} from 'src/types/thunk';

const {publicRuntimeConfig} = getConfig();

const Friends: React.FC = () => {
  const {meta} = useSelector<RootState, FriendState>(state => state.friendState);

  //TODO: any logic + components which replace
  // the middle column of home page should go here

  return (
    <DefaultLayout isOnProfilePage={false}>
      <Head>
        <title>{i18n.t('Friends.Title', {appname: publicRuntimeConfig.appName})}</title>
      </Head>
      <TopNavbarComponent
        description={`${meta.totalItemCount} Friends`}
        sectionTitle={SectionTitle.FRIENDS}
      />

      <FriendMenuComponent />
    </DefaultLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const {req} = context;
  const {headers} = req;

  const dispatch = store.dispatch as ThunkDispatchAction;

  if (typeof window === 'undefined' && headers['user-agent']) {
    const UAParser = eval('require("ua-parser-js")');
    const parser = new UAParser();
    const device = parser.setUA(headers['user-agent']).getDevice();

    if (device.type === 'mobile') {
      return {
        redirect: {
          destination: '/mobile',
          permanent: false,
          headers,
        },
      };
    }
  }

  const available = await healthcheck();

  if (!available) {
    return {
      redirect: {
        destination: '/maintenance',
        permanent: false,
      },
    };
  }

  const session = await getSession(context);

  setHeaders({cookie: req.headers.cookie as string});

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const anonymous = Boolean(session?.user.anonymous);

  const userId = session?.user.address as string;

  if (anonymous || !userId) {
    const username = session?.user.name as string;

    await dispatch(setAnonymous(username));
  } else {
    await dispatch(fetchUser(userId));

    await Promise.all([
      dispatch(fetchConnectedSocials()),
      dispatch(fetchAvailableToken()),
      dispatch(countNewNotification()),
      dispatch(getUserCurrencies()),
      dispatch(fetchFriend()),
    ]);
  }

  await dispatch(fetchExchangeRates());
  await dispatch(fetchUserExperience());

  return {
    props: {
      session,
    },
  };
});

export default Friends;
