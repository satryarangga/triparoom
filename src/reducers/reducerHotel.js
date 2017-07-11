import _ from 'lodash';
import { FETCH_HOME_HOTEL, FETCH_HOTEL_LIST } from '../actions/actionHotel';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_HOME_HOTEL:
      return (action.payload) ? _.mapKeys(action.payload.data.results.result, 'id') : {};
    case FETCH_HOTEL_LIST:
      return (action.payload) ? _.mapKeys(action.payload.data.results.result, 'id') : {};
    default:
      return state;
  }
}
