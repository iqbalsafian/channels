export const GET_CHANNELS = 'GET_CHANNELS';

const INITIAL_STATE = {
  channels: []
};

const channels = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CHANNELS:
      return {
        ...state,
        channels: action.payload
      }
    default:
      return state;
  }
};

export default channels;
