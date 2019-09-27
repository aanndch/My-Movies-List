import { STORE_USER_INFO, SET_FILTERS } from "./types";

const storeUserInfo = (user, token) => {
  return {
    type: STORE_USER_INFO,
    user,
    token
  };
};

const setFilters = filters => {
  return {
    type: SET_FILTERS,
    filters
  };
};

export { storeUserInfo, setFilters };
