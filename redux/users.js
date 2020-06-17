export const INITIAL_STATE = {
  data: [],
};

export const ACTION_TYPES = {
  LOAD: "@@users/load",
  SET: "@@users/set",
};

export const loadUsers = () => ({ type: ACTION_TYPES.LOAD });

export const setUsers = (payload) => ({ type: ACTION_TYPES.SET, payload });

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default reducer;
