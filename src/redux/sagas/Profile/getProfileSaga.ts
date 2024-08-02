import { put } from 'redux-saga/effects';

import { call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { orderAPI, ProfileAPI } from '../../../services/api';
import { profileActions } from '../../actions/combineAction';

export function* getProfileSaga({ payload }: any) {
  try {
    const response: AxiosResponse = yield call(ProfileAPI.getProfile, payload);

    const resPayload = response?.data;
    //set Token
    yield put(
      profileActions.profilesSuccesss({
        ...resPayload
      })
    );

    // Redirect to Admin page
  } catch (error) {
    yield put(profileActions.profilesFailure(error)); // Dispatch action
  }
}
