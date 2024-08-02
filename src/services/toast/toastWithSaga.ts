import toast from '.';
import store from '../../redux/store';

export function* handleError(error: any, errorSaga: Function) {
  toast.danger({ message: error?.response?.data?.errors?.[0]?.message });
  store.dispatch(errorSaga(error?.response?.data?.errors?.[0]?.message));
  return;
}
