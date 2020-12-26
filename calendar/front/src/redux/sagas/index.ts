import { call, put, all, takeEvery } from "redux-saga/effects";
import * as timeRecordsService from "../../services/timeRecords.service";
import * as actions from "../../redux/actions";
import * as ActionTypes from "../ActionTypes";

export function* fetchTimesheet({ payload }: actions.requestTimeSheetType) {
  const results = yield call(
    timeRecordsService.getForMonth,
    payload.getMonth() + 1,
    payload.getFullYear()
  );
  yield put(actions.loadTimeSheet(payload, results?.data?.monthly));
}

function* watchFetchTimesheet() {
  yield takeEvery(ActionTypes.TIMESHEET_REQUEST, fetchTimesheet);
}

export default function* rootSaga() {
  yield all([watchFetchTimesheet()]);
}
