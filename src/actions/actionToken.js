import axios from 'axios';
import { ROOT_URL } from '../../config/api';

export default function fetchToken (callback) {
  if(!localStorage.tiketToken) {
    const request = axios.get(`${ROOT_URL}/api/token`)
                    .then(res => {
                      localStorage.setItem("tiketToken", res.data.token);
                      callback();
                    });
   } else {
     callback();
   }
}
