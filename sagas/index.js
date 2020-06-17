import { all } from "redux-saga/effects";

import usersSaga from "./users";

function* rootSaga() {
  yield all([usersSaga()]);
}

export default rootSaga;
