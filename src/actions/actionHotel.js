import axios from 'axios';
import { ROOT_URL } from '../../config/api';

export const FETCH_HOME_HOTEL = 'fetch_home_hotel';

export function fetchHomeHotel () {
  const token = '27b6e87a1f4207a2fc035673cf21e19f79548299';
  const keyword = 'bali';
  const request = axios.get(`${ROOT_URL}/api/promo?token=${token}&keyword=${keyword}`);

  return {
    type: FETCH_HOME_HOTEL,
    payload: request
  }
}
