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
    case SORT_CHANNELS:
      let channels = state.channels;
      channels.sort((a, b) => {
        if (action.payload.orderBy === 'asc')
          return (a[action.payload.orderType] - b[action.payload.orderType]);
        else
          return (b[action.payload.orderType] - a[action.payload.orderType]);
      });
      return {
        ...state,
        channels: channels
      }
    default:
      return {state};
  }
};

export default channels;
