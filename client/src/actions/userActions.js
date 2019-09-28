import { STORE_USER_INFO, SET_FILTERS, SET_OPEN_SEARCH } from "./types";

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

const setOpenSearch = () => {
  return {
    type: SET_OPEN_SEARCH
  };
};

export { storeUserInfo, setFilters, setOpenSearch };
