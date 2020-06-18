import { call, put, takeEvery } from "redux-saga/effects";

import { ACTION_TYPES, setLoading, setUsers, setUserById } from "~redux/users";
import * as users from "~services/users";

function* loadUsers() {
  yield put(setLoading(true));
  const data = yield call(users.load);
  yield put(setLoading(false));
  yield put(setUsers(data));
}

function* getUserById({ payload: id }) {
  yield put(setLoading(true));
  const data = yield call(users.get, id);
  yield put(setLoading(false));
  yield put(setUserById(data));
}

function* usersSaga() {
  yield takeEvery(ACTION_TYPES.LOAD, loadUsers);
  yield takeEvery(ACTION_TYPES.GET_BY_ID, getUserById);
}

export default usersSaga;
