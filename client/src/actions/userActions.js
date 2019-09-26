import { STORE_USER_INFO } from "./types";

const storeUserInfo = (user, token) => {
  return {
    type: STORE_USER_INFO,
    user,
    token
  };
};

export { storeUserInfo };
