import { GET_CHANNELS, SORT_CHANNELS } from '../types';

const INITIAL_STATE = {
  channels: [],
  favourites: []
};

const channels = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CHANNELS:
      return {
        ...state,
        channels: action.payload
      }
    default:
      return {state};
  }
};

export default channels;
