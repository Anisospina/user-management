jest.mock("~services/users");

import { runSaga } from "redux-saga";
import { call, delay, put, select } from "redux-saga/effects";

import { getUserById, loadUsers, saveUser, showMessage } from "../users";
import {
  clearMessage,
  setLoading,
  setMessage,
  setUsers,
  setUserById,
} from "~redux/users";
import * as users from "~services/users";

const setupRunSaga = (saga, ...params) => async (state = {}) => {
  const dispatched = [];
  await runSaga(
    {
      dispatch: (action) => dispatched.push(action),
      getState: () => state,
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
        "it should clear the message"
      );
    });

    test("full saga", async () => {
      const TYPE = "test-type";
      const MESSAGE = "test-message";
      const dispatched = await setupRunSaga(showMessage, TYPE, MESSAGE)();
      expect(dispatched).toEqual([setMessage(TYPE, MESSAGE), clearMessage()]);
    });
  });

  describe("load users", () => {
    test("step by step success", () => {
      const gen = loadUsers();

      expect(gen.next().value).toEqual(
        put(setLoading(true)),
        "set loading to true to show backdrop"
      );

      expect(gen.next().value).toEqual(call(users.load), "call service load");

      expect(gen.next().value).toEqual(
        put(setLoading(false)),
        "set loading to false to hide backdrop"
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
      const dispatched = await setupRunSaga(loadUsers)();
      expect(dispatched).toEqual([
        setLoading(true),
        setLoading(false),
        setUsers(API_RESULT),
      ]);
    });
  });

  describe("get user by id", () => {
    test("step by step", () => {
      const ID = 100;
      const gen = getUserById({ payload: ID });

      expect(gen.next().value).toEqual(
        put(setLoading(true)),
        "set loading to true to show backdrop"
      );

      expect(gen.next().value).toEqual(call(users.get, ID), "call service get");

      expect(gen.next().value).toEqual(
        put(setLoading(false)),
        "set loading to false to hide backdrop"
      );
    });

    test("step by step error", () => {
      const ID = 100;
      const gen = getUserById({ payload: ID });
      gen.next();

      const catchBlock = gen.throw(new Error("test-error")).value;

      expect(catchBlock.next().value).toEqual(
        put(setMessage("error", "Cannot load the data")),
        "shows an error message when catch and error"
      );
    });

    test("full saga", async () => {
      const API_RESULT = "user-data-here";
      const ID = 100;
      users.get.mockReturnValueOnce(API_RESULT);
      const dispatched = await setupRunSaga(getUserById, { payload: ID })();
      expect(dispatched).toEqual([
        setLoading(true),
        setLoading(false),
        setUserById(API_RESULT),
      ]);
    });
  });

  describe("save user", () => {
    test("step by step: create", () => {
      const isNew = true;
      const data = "user-form-data";
      const gen = saveUser({ payload: { isNew, data } });

      expect(gen.next().value).toEqual(
        put(setLoading(true)),
        "set loading to true to show the backdrop"
      );

      expect(gen.next().value).toEqual(
        call(users.create, data),
        "call the method to create an user"
      );

      expect(gen.next().value).toEqual(
        put(setLoading(false)),
        "set loading to false to hide the backdrop"
      );

      const messageGen = gen.next().value;

      expect(messageGen.next().value).toEqual(
        put(setMessage("success", "User created")),
        "set loading to false to hide the backdrop"
      );
    });

    test("step by step: update", () => {
      const ID = 100;
      const isNew = false;
      const data = "user-form-data";
      const gen = saveUser({ payload: { isNew, data } });

      expect(gen.next().value).toEqual(
        put(setLoading(true)),
        "set loading to true to show the backdrop"
      );

      // Here we compare stringified objects due to issues
      // comparing the bare value
      expect(JSON.stringify(gen.next().value)).toBe(
        JSON.stringify(select(() => null)),
        "select the user id"
      );

      expect(gen.next(ID).value).toEqual(
        call(users.update, ID, data),
        "call the method to update an user"
      );

      expect(gen.next().value).toEqual(
        put(setLoading(false)),
        "set loading to false to hide the backdrop"
      );

      const messageGen = gen.next().value;

      expect(messageGen.next().value).toEqual(
        put(setMessage("success", "User updated")),
        "set loading to false to hide the backdrop"
      );
    });

    test("step by step error", () => {
      const gen = saveUser({ payload: {} });
      gen.next();

      const catchBlock = gen.throw(new Error("test-error")).value;

      expect(catchBlock.next().value).toEqual(
        put(setMessage("error", "Cannot update the user")),
        "shows a message when fail to create or update the user"
      );
    });

    test("full saga", async () => {
      const API_RESPONSE = "response-create";
      const payload = {};
      users.create.mockReturnValueOnce(API_RESPONSE);
      const dispatched = await setupRunSaga(saveUser, { payload })({
        users: {
          user: {
            id: 100,
          },
        },
      });
      expect(dispatched).toEqual([
        setLoading(true),
        setLoading(false),
        setMessage("success", "User updated"),
        clearMessage(),
      ]);
    });
  });
});
