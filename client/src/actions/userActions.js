import { STORE_USER_INFO } from "./types";

const storeUserInfo = user => {
  return {
    type: STORE_USER_INFO,
    user
  };
};

export { storeUserInfo };
