import { GET_CHANNELS, ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from '../types';

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
    case ADD_TO_FAVOURITES:
      let favourites = state.favourites;
      favourites.push(action.payload);
      return {
        ...state,
        favourites
      }
    case REMOVE_FROM_FAVOURITES:
      favourites = state.favourites;
      const indexNumber = favourites.indexOf(action.payload);
      favourites.splice(indexNumber, 1);
      return {
        ...state,
        favourites
      }
    default:
      return state;
  }
};

export default channels;
