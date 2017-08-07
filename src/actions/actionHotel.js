import axios from 'axios';
import { ROOT_URL } from '../../config/api';

export const FETCH_HOTEL_LIST = 'fetch_hotel_list';
export const SORT_HOTEL_LIST = 'sort_hotel_list';
export const CLEAR_HOTEL_PAGINATION = 'clear_hotel_pagination';
export const CLEAR_HOTEL_SEARCH = 'clear_hotel_search';
export const FETCH_DETAIL_HOTEL = 'fetch_detail_hotel';

export function fetchHomeHotel () {
  const token = localStorage.tiketToken;
  const keyword = 'bali';
  const request = axios.get(`${ROOT_URL}/api/promo?token=${token}&keyword=${keyword}&adult=2`);

  return {
    type: FETCH_HOTEL_LIST,
    payload: request
  }
}

export function fetchHotelList (param, star, min_price, max_price, page) {
  star = (star) ? star : 0;
  page = (page) ? page : 1;
  min_price = (min_price) ? min_price : 0;
  max_price = (max_price) ? max_price : 20000000;
  const token = localStorage.tiketToken;
  const request = axios.get(`${ROOT_URL}/api/promo?token=${token}&keyword=${param.keyword}&startdate=${param.start}&night=${param.night}&room=${param.room}&adult=${param.adult}&star=${star}&minprice=${min_price}&maxprice=${max_price}&page=${page}`);

  return {
    type: FETCH_HOTEL_LIST,
    payload: request
  }
}

export function clearHotelPagination () {
  return {
    type: CLEAR_HOTEL_PAGINATION
  }
}

export function clearHotelSearch () {
  return {
    type: CLEAR_HOTEL_SEARCH
  }
}

export function sortHotelList (sortField, sortType, data) {
  return {
    type: SORT_HOTEL_LIST,
    sortField: sortField,
    sortType: sortType,
    payload: data
  }
}

export function fetchDetailHotel (param) {
  const token = localStorage.tiketToken;
  const request = axios.get(`${ROOT_URL}/api/detailhotel?uri=${param.uri}&startdate=${param.startdate}&night=${param.night}&room=${param.room}&adult=${param.adult}&token=${token}`);

  return {
    type: FETCH_DETAIL_HOTEL,
    payload: request
  }
}
