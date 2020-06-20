import { call, delay, put, select, takeEvery } from "redux-saga/effects";

import {
  ACTION_TYPES,
  setLoading,
  setMessage,
  clearMessage,
  setUsers,
  setUserById,
} from "~redux/users";
import * as users from "~services/users";

function* showMessage(type, message) {
  yield put(setMessage(type, message));
  yield delay(2000);
  yield put(clearMessage());
}

function* loadUsers() {
  try {
    yield put(setLoading(true));
    const data = yield call(users.load);
    yield put(setLoading(false));
    yield put(setUsers(data));
  } catch (error) {
    yield showMessage("error", "Cannot load the data");
  }
}

function* getUserById({ payload: id }) {
  try {
    yield put(setLoading(true));
    const data = yield call(users.get, id);
    yield put(setLoading(false));
    yield put(setUserById(data));
  } catch (error) {
    yield showMessage("error", "Cannot load the data");
  }
}

function* saveUser({ payload }) {
  const { isNew, data } = payload;
  const action = isNew ? "create" : "update";
  try {
    yield put(setLoading(true));
    if (isNew) {
      const response = yield call(users.create, data);
    } else {
      const { id } = yield select(({ users }) => users.user);
      const response = yield call(users.update, id, data);
    }
    yield put(setLoading(false));
    yield showMessage("success", `User ${action}d`);
  } catch (error) {
    yield showMessage("error", `Cannot ${action} the user`);
  }
}

function* usersSaga() {
  yield takeEvery(ACTION_TYPES.LOAD, loadUsers);
  yield takeEvery(ACTION_TYPES.GET_BY_ID, getUserById);
  yield takeEvery(ACTION_TYPES.SAVE, saveUser);
}

export default usersSaga;
