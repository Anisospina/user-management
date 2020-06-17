import { call, put, takeEvery } from "redux-saga/effects";

import { ACTION_TYPES, setUsers } from "~redux/users";
import * as users from "~services/users";

function* loadUsers() {
  const data = yield call(users.load);
  yield put(setUsers(data));
}

function* usersSaga() {
  yield takeEvery(ACTION_TYPES.LOAD, loadUsers);
}

export default usersSaga;
