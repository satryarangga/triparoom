import axios from 'axios';
import { ROOT_URL } from '../../config/api';

export const GET_AIRPORT = 'get_airport';
export const FETCH_FLIGHT = 'fetch_flight';
export const SORT_FLIGHT = 'sort_flight';
export const CLEAR_FLIGHT_SEARCH = 'clear_flight_search';
export const SET_DEPARTURE_FLIGHT = 'set_departure_flight';
export const SET_ORDER_FLIGHT = 'set_order_flight';
export const CLEAR_DEPARTURE_FLIGHT = 'clear_departure_flight';

export const getAirport = () => {
  const token = localStorage.tiketToken;
  const request = axios.get(`${ROOT_URL}/api/airport?token=${token}`);

  return {
    type: GET_AIRPORT,
    payload: request
  }
}

export const fetchFlight = (dcode, acode, ddate, rdate, adult, child, infant) => {
  const token = localStorage.tiketToken;
  const request = axios.get(`${ROOT_URL}/api/flight?token=${token}&dcode=${dcode}&acode=${acode}&ddate=${ddate}&rdate=${rdate}&adult=${adult}&child=${child}&infant=${infant}`);

  return {
    type: FETCH_FLIGHT,
    payload: request
  }
}

export const sortFlight = (sortField) => {
  return {
    type: SORT_FLIGHT,
    sortField: sortField
  }
}

export function clearFlightSearch () {
  return {
    type: CLEAR_FLIGHT_SEARCH
  }
}

export const setDepartureFlight = (depDetail) => {
  return {
    type: SET_DEPARTURE_FLIGHT,
    payload: depDetail
  }
}

export const setOrderFlight = (depDetail, retDetail) => {
  return {
    type: SET_ORDER_FLIGHT,
    departure: depDetail,
    return: retDetail,
  }
}

export const clearDepartureFlight = () => {
  return {
    type: CLEAR_DEPARTURE_FLIGHT
  }
}
