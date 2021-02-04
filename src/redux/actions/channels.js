import axios from 'axios';
import { ADD_TO_FAVOURITES, GET_CHANNELS, REMOVE_FROM_FAVOURITES } from '../types';

export const getChannels = async dispatch => {
  try {
    const res = await axios.get('https://contenthub-api.eco.astro.com.my/channel/all.json');
    dispatch({ type: GET_CHANNELS, payload: res.data.response });
  } catch (error) {
    console.log('errors', error);
  }
};

// export const addToFavorite = channelId => {
//   return { type: ADD_TO_FAVOURITES, payload: channelId };
// }

export const addToFavorite = channelId => dispatch => dispatch({ type: ADD_TO_FAVOURITES, payload: channelId })

export const removeFromFavourite = (channelId) => dispatch => 
  dispatch({ type: REMOVE_FROM_FAVOURITES, payload: channelId });