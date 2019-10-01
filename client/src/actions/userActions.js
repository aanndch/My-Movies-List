import {
  STORE_USER_INFO,
  SET_FILTERS,
  SET_OPEN_SEARCH,
  STORE_SEARCHED_USER_INFO
} from "./types";

const storeUserInfo = (user, token) => ({
  type: STORE_USER_INFO,
  user,
  token
});

const storeSearchedUserInfo = user => ({
  type: STORE_SEARCHED_USER_INFO,
  user
});

const setFilters = filters => ({
  type: SET_FILTERS,
  filters
});

const setOpenSearch = open => ({
  type: SET_OPEN_SEARCH,
  open
});

export { storeUserInfo, setFilters, setOpenSearch, storeSearchedUserInfo };
