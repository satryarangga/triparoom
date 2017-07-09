import axios from 'axios';
import { ROOT_URL } from '../../config/api';

export const GET_TOKEN = 'get_token';

export function fetchToken () {
  const request = axios.get(`${ROOT_URL}/api/token`);

  return {
    type: GET_TOKEN,
    payload: request
  }
}
