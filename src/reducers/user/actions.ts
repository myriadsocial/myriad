import { Actions as BaseAction, setLoading, setError } from '../base/actions';
import { RootState } from '../index';
import * as constants from './constants';

import { Action } from 'redux';
import { Token } from 'src/interfaces/token';
import { ExtendedUser } from 'src/interfaces/user';
import * as TokenAPI from 'src/lib/api/token';
import * as UserAPI from 'src/lib/api/user';
import { ThunkActionCreator } from 'src/types/thunk';

/**
 * Action Types
 */

export interface SetUserAsAnonymous extends Action {
  type: constants.SET_USER_AS_ANONYMOUS;
  alias: string;
}

export interface FetchUser extends Action {
  type: constants.FETCH_USER;
  user: ExtendedUser;
}

export interface FetchUserToken extends Action {
  type: constants.FETCH_USER_TOKEN;
  payload: Token[];
}

/**
 * Union Action Types
 */

export type Actions = FetchUser | FetchUserToken | SetUserAsAnonymous | BaseAction;

/**
 *
 * Actions
 */
export const setUser = (user: ExtendedUser): FetchUser => ({
  type: constants.FETCH_USER,
  user
});

export const setAnonymous = (alias: string): SetUserAsAnonymous => ({
  type: constants.SET_USER_AS_ANONYMOUS,
  alias
});

/**
 * Action Creator
 */
export const fetchUser: ThunkActionCreator<Actions, RootState> = (userId: string) => async dispatch => {
  dispatch(setLoading(true));

  try {
    let user: ExtendedUser = await UserAPI.getUserDetail(userId);

    if (!user.userCredentials) {
      user.userCredentials = [];
    }

    dispatch(setUser(user));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchToken: ThunkActionCreator<Actions, RootState> = () => async (dispatch, getState) => {
  dispatch(setLoading(true));

  const {
    userState: { user }
  } = getState();

  if (!user) return;

  try {
    const tokens = await TokenAPI.getUserTokens({
      id: user.id
    });

    dispatch({
      type: constants.FETCH_USER_TOKEN,
      payload: tokens
    });
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const setUserAsAnonymous: ThunkActionCreator<Actions, RootState> = (alias: string) => async dispatch => {
  dispatch(setAnonymous(alias));
};
