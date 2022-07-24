import React from 'react';

import {getSession} from 'next-auth/react';
import getConfig from 'next/config';
import Head from 'next/head';

import {Timeline} from 'components/Timeline/Timeline.layout';
import {SearchBoxContainer} from 'components/atoms/Search/SearchBoxContainer';
import {NavbarComponent} from 'src/components/Mobile/Navbar/Navbar';
import {RichTextContainer} from 'src/components/Richtext/RichTextContainer';
import {AppStatusBanner} from 'src/components/common/Banner';
import {TippingSuccess} from 'src/components/common/Tipping/render/Tipping.success';
import {DefaultLayout} from 'src/components/template/Default/DefaultLayout';
import {initialize} from 'src/lib/api/base';
import {healthcheck} from 'src/lib/api/healthcheck';
import i18n from 'src/locale';
import {fetchAvailableToken} from 'src/reducers/config/actions';
import {fetchExchangeRates} from 'src/reducers/exchange-rate/actions';
import {fetchFriend} from 'src/reducers/friend/actions';
import {countNewNotification} from 'src/reducers/notification/actions';
import {
  setAnonymous,
  fetchConnectedSocials,
  fetchUser,
  fetchUserExperience,
  fetchUserWallets,
  fetchNetwork,
} from 'src/reducers/user/actions';
import {wrapper} from 'src/store';
import {ThunkDispatchAction} from 'src/types/thunk';

const {publicRuntimeConfig} = getConfig();

const Home: React.FC = () => {
  return (
    <DefaultLayout isOnProfilePage={false}>
      <Head>
        <title>{i18n.t('Home.Title', {appname: publicRuntimeConfig.appName})}</title>
      </Head>

      <NavbarComponent />

      <SearchBoxContainer hidden={true} />

      <RichTextContainer />

      <Timeline />

      <TippingSuccess />

      <AppStatusBanner />
    </DefaultLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const {req} = context;

  const dispatch = store.dispatch as ThunkDispatchAction;

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

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const anonymous = Boolean(session?.user.anonymous);
  const userId = session?.user.address;

  initialize({cookie: req.headers.cookie}, anonymous);

  if (anonymous || !userId) {
    await dispatch(setAnonymous(session.user.name));
  } else {
    await dispatch(fetchUser(userId));

    await Promise.all([
      dispatch(fetchConnectedSocials()),
      dispatch(fetchUserWallets()),
      dispatch(countNewNotification()),
      dispatch(fetchFriend()),
    ]);
  }

  await Promise.all([
    dispatch(fetchAvailableToken()),
    dispatch(fetchNetwork()),
    dispatch(fetchExchangeRates()),
  ]);

  await dispatch(fetchUserExperience());

  return {
    props: {
      session,
    },
  };
});

export default Home;
