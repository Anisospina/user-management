jest.mock("~services/users");

import { runSaga } from "redux-saga";
import { call, delay, put } from "redux-saga/effects";

import { getUserById, loadUsers, showMessage } from "../users";
import { clearMessage, setLoading, setMessage, setUsers } from "~redux/users";
import * as users from "~services/users";

const setupRunSaga = async (saga, ...params) => {
  const dispatched = [];
  await runSaga(
    {
      dispatch: (action) => dispatched.push(action),
      getState: () => ({}),
    },
    saga,
    ...params
  ).toPromise();
  return dispatched;
};

describe("Users saga", () => {
  describe("show messages", () => {
    test("step by step", () => {
      const TYPE = "test-type";
      const MESSAGE = "test-message";
      const gen = showMessage(TYPE, MESSAGE);

      expect(gen.next().value).toEqual(
        put(setMessage(TYPE, MESSAGE)),
        "it should set the message and type"
      );

      expect(gen.next().value).toEqual(delay(2000), "it should wait 2 seconds");

      expect(gen.next().value).toEqual(
        put(clearMessage()),
        "it should set the message and type"
      );
    });

    test("full saga", async () => {
      const TYPE = "test-type";
      const MESSAGE = "test-message";
      const dispatched = await setupRunSaga(showMessage, TYPE, MESSAGE);
      expect(dispatched).toEqual([setMessage(TYPE, MESSAGE), clearMessage()]);
    });
  });

  describe("load users", () => {
    test("step by step success", () => {
      const gen = loadUsers();

      expect(gen.next().value).toEqual(
        put(setLoading(true)),
        "set loading true to show backdrop"
      );

      expect(gen.next().value).toEqual(call(users.load), "call service load");

      expect(gen.next().value).toEqual(
        put(setLoading(false)),
        "set loading true to show backdrop"
      );
    });

    test("step by step error", () => {
      const gen = loadUsers();
      gen.next();
      const catchBlock = gen.throw(new Error("test-error")).value;
      expect(catchBlock.next().value).toEqual(
        put(setMessage("error", "Cannot load the data")),
        "set the error message"
      );
    });

    test("full saga", async () => {
      const API_RESULT = "user-data-here";
      users.load.mockReturnValueOnce(API_RESULT);
      const dispatched = await setupRunSaga(loadUsers);
      expect(dispatched).toEqual([
        setLoading(true),
        setLoading(false),
        setUsers(API_RESULT),
      ]);
    });
  });
});
