import { put } from 'redux-saga/effects';

import { call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { processAPI } from '../../../services/api';
import { processesActions } from '../../actions/combineAction';

export function* getProcessesSaga() {
  try {
    const response: AxiosResponse = yield call(processAPI.getProcesses);

    const resPayload = response?.data;
    //set Token
    yield put(
      processesActions.getProcessesSuccesss({
        ...resPayload
      })
    );

    // Redirect to Admin page
  } catch (error) {
    yield put(processesActions.getProcessesFailure(error)); // Dispatch action
  }
}
