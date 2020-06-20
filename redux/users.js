export const INITIAL_STATE = {
  loading: false,
  data: [],
  user: null,
};

export const ACTION_TYPES = {
  SET_LOADING: "@@users/set-loading",
  LOAD: "@@users/load",
  SET: "@@users/set",
  GET_BY_ID: "@@users/get-by-id",
  SET_BY_ID: "@@users/set-by-id",
  SAVE: "@@users/save",
};

export const setLoading = (payload) => ({
  type: ACTION_TYPES.SET_LOADING,
  payload,
});

export const loadUsers = () => ({ type: ACTION_TYPES.LOAD });

export const setUsers = (payload) => ({ type: ACTION_TYPES.SET, payload });

export const getUserById = (payload) => ({
  type: ACTION_TYPES.GET_BY_ID,
  payload,
});

export const setUserById = (payload) => ({
  type: ACTION_TYPES.SET_BY_ID,
  payload,
});

export const saveUser = (isNew, data) => ({
  type: ACTION_TYPES.SAVE,
  payload: {
    isNew,
    data,
  },
});

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTION_TYPES.SET:
      return { ...state, data: action.payload };
    case ACTION_TYPES.SET_BY_ID:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default reducer;
