import axios from 'axios';
import { ROOT_URL } from '../../config/api';

export const FETCH_FLIGHT_DATA = 'fetch_flight_data';
export const ADD_FLIGHT_ORDER = 'add_flight_order';
export const FETCH_FLIGHT_ORDER = 'fetch_flight_order';
export const CHECKOUT_FLIGHT = 'checkout_flight';

export const fetchFlightData = (depFlightId, retFlightId, depDate, retDate) => {
  const token = localStorage.tiketToken;
  const request = axios.get(`${ROOT_URL}/api/flight-detail?token=${token}&dep_flight_id=${depFlightId}&ret_flight_id=${retFlightId}&dep_date=${depDate}&ret_date=${retDate}`);

  return {
    type: FETCH_FLIGHT_DATA,
    payload: request
  }
}

export const addFlightOrder = (param, depFlightId, retFlightId, adult, child, infant, callback) => {
  const token = localStorage.tiketToken;

  param.conSalutation = param.titlea1;
  param.conFirstName = param.firstnamea1;
  param.conLastName = param.lastnamea1;
  const request = axios.get(`${ROOT_URL}/api/addFlightOrder`, {
    params: {
      token,
      flight_id: depFlightId,
      ret_flight_id: retFlightId,
      adult: adult,
      child: child,
      infant: infant,
      params: encodeURIComponent(JSON.stringify(param))
    }
  }).then( (response) => callback(response.data.diagnostic.status));

  return {
    type: ADD_FLIGHT_ORDER,
    payload: request
  }
}

export function fetchFlightOrder() {
  const token = localStorage.tiketToken;
  const request = axios.get(`${ROOT_URL}/api/order?token=${token}`);

  return {
    type: FETCH_FLIGHT_ORDER,
    payload: request
  }
}

export function checkoutFlight(field, callback) {
  const token = localStorage.tiketToken;
  const salute = field.salute;
  const first_name = field.first_name;
  const last_name = field.last_name;
  const email = field.email;
  const payment_method_url = field.payment_method;
  const phone = field.phone;

  const request = axios.get(`${ROOT_URL}/api/checkout?token=${token}&first_name=${first_name}&last_name=${last_name}&salute=${salute}&phone=${phone}&email=${email}&uri=${encodeURIComponent(payment_method_url)}`)
                  .then(() => callback());

  // const request = axios.get(`${ROOT_URL}/api/checkout-flight?token=${token}&uri=${encodeURIComponent(payment_method_url)}`)
  //                 .then(() => callback());

  return {
    type: CHECKOUT_FLIGHT,
    payload: request
  }
}
