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
  const request = axios.get(`${ROOT_URL}/api/promo?token=${token}&keyword=${keyword}`);

  return {
    type: FETCH_HOTEL_LIST,
    payload: request
  }
}

export function fetchHotelList (keyword, start_date, end_date, star, min_price, max_price, page) {
  star = (star) ? star : 0;
  page = (page) ? page : 1;
  min_price = (min_price) ? min_price : 0;
  max_price = (max_price) ? max_price : 20000000;
  const token = localStorage.tiketToken;
  const request = axios.get(`${ROOT_URL}/api/promo?token=${token}&keyword=${keyword}&startdate=${start_date}&enddate=${end_date}&star=${star}&minprice=${min_price}&maxprice=${max_price}&page=${page}`);

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

export function fetchDetailHotel (url) {
  const token = localStorage.tiketToken;
  const request = axios.get(`${ROOT_URL}/api/detailhotel?uri=${encodeURIComponent(url)}&token=${token}`);

  return {
    type: FETCH_DETAIL_HOTEL,
    payload: request
  }
}
