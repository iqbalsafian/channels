import { GET_CHANNELS, ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from '../types';

const INITIAL_STATE = {
  channels: [],
  favourites: []
};

const channels = (state = INITIAL_STATE, action) => {
  let favourites = state.favourites;
  switch (action.type) {
    case GET_CHANNELS:
      return {
        ...state,
        channels: action.payload
      }
    case ADD_TO_FAVOURITES:
      favourites = state.favourites;
      favourites.push(action.payload);
      return {
        ...state,
        favourites
      }
    case REMOVE_FROM_FAVOURITES:
      favourites = state.favourites;
      const indexNumber = favourites.includes(action.payload);
      console.log(indexNumber);
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
