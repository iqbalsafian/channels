import axios from 'axios';
import { GET_CHANNELS } from '../types';

export const getChannels = async dispatch => {
  try {
    const res = await axios.get('https://contenthub-api.eco.astro.com.my/channel/all.json');
    dispatch({ type: GET_CHANNELS, payload: res.data.response });
  } catch (error) {
    console.log('errors', error);
  }
};
