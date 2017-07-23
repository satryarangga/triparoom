import axios from 'axios';
import { ROOT_URL } from '../../config/api';

export const FETCH_ORDER = 'fetch_order';
export const ADD_ORDER = 'add_order';
export const CHECKOUT_ORDER = 'checkout_order';

export function fetchOrder() {
  const token = localStorage.tiketToken;
  const request = axios.get(`${ROOT_URL}/api/order?token=${token}`);

  return {
    type: FETCH_ORDER,
    payload: request
  }
}

export function addOrder(url, currentCartId, callback) {
  const token = localStorage.tiketToken;
  const request = axios.get(`${ROOT_URL}/api/addOrder?uri=${encodeURIComponent(url)}&token=${token}&currentCart=${currentCartId}`)
                  .then(() => callback());

  return {
    type: ADD_ORDER,
    payload: request
  }
}

export function checkoutOrder(field, detail_id, order_id, callback) {
  const token = localStorage.tiketToken;
  const salute = field.salute;
  const first_name = field.first_name;
  const last_name = field.last_name;
  const email = field.email;
  const payment_method_url = field.payment_method;
  const phone = field.phone;

  const request = axios.get(`${ROOT_URL}/api/checkout?token=${token}&first_name=${first_name}&last_name=${last_name}&salute=${salute}&phone=${phone}&email=${email}&order_detail_id=${detail_id}&order_id=${order_id}&uri=${encodeURIComponent(payment_method_url)}`)
                  .then(() => callback());

  return {
    type: CHECKOUT_ORDER,
    payload: request
  }
}
