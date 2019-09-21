import { SET_NOW_PLAYING } from "../actions/types";

const initialState = {
  nowPlaying: []
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOW_PLAYING: {
      return {
        ...state,
        nowPlaying: action.nowPlaying
      };
    }
    default:
      return state;
  }
};

export default apiReducer;
