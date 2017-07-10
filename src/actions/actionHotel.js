import axios from 'axios';
import { fetchToken } from './actionToken';
import { ROOT_URL } from '../../config/api';

export const FETCH_HOME_HOTEL = 'fetch_home_hotel';

export function fetchHomeHotel () {
  const token = localStorage.tiketToken;
  const keyword = 'bali';
  const request = axios.get(`${ROOT_URL}/api/promo?token=${token}&keyword=${keyword}`);

  return {
    type: FETCH_HOME_HOTEL,
    payload: request
  }
}
