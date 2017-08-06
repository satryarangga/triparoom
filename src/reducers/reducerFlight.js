import { GET_AIRPORT, FETCH_FLIGHT, SORT_FLIGHT, CLEAR_FLIGHT_SEARCH, SET_DEPARTURE_FLIGHT, CLEAR_DEPARTURE_FLIGHT, SET_ORDER_FLIGHT } from '../actions/actionFlight';
import { formatAirportList, formatDurationMinutes } from '../utils/formatter';
import _ from 'lodash';

export default function (state = { airport:[], queries:{}, depResult:[], retResult:[], goDetail:{}, retDetail:{} }, action) {
  switch(action.type) {
    case GET_AIRPORT:
      return {
        ...state,
          airport: formatAirportList(action.payload.data.all_airport.airport)
      }
    case FETCH_FLIGHT:
      return {
        ...state,
          airport: formatAirportList(action.payload.data.airport),
          queries: action.payload.data.search_queries,
          depResult: (action.payload.data.departures) ? _.mapKeys(action.payload.data.departures.result, 'flight_id') : {},
          retResult: (action.payload.data.returns) ? _.mapKeys(action.payload.data.returns.result, 'flight_id') : {},
      }
    case SORT_FLIGHT:
      _.mapKeys(state.depResult, dep => {
        if(!_.isNumber(dep.price_value)){
          state.depResult[dep.flight_id].price_value = _.parseInt(dep.price_value);
        }
        if(!_.isNumber(dep.duration_minutes)) {
          state.depResult[dep.flight_id].duration_minutes = formatDurationMinutes(dep.duration);
        }
      },'id');

      _.mapKeys(state.retResult, ret => {
        if(!_.isNumber(ret.price_value)){
          state.retResult[ret.flight_id].price_value = _.parseInt(ret.price_value);
        }
        if(!_.isNumber(ret.duration_minutes)) {
          state.retResult[ret.flight_id].duration_minutes = formatDurationMinutes(ret.duration);
        }
      },'id');
      return {
        ...state,
          depResult: _.sortByOrder(state.depResult, action.sortField, 'asc'),
          retResult: _.sortByOrder(state.retResult, action.sortField, 'asc')
      }
    case CLEAR_FLIGHT_SEARCH:
      return {
        ...state,
          queries: {},
          depResult: {},
          retResult: {},
      };
    case SET_DEPARTURE_FLIGHT:
      return {
        ...state,
          goDetail: action.payload
      }
    case SET_ORDER_FLIGHT:
      return {
        ...state,
          retDetail: action.return,
          goDetail: action.departure
      }
    case CLEAR_DEPARTURE_FLIGHT:
      return {
        ...state,
          goDetail: {}
      }
    default:
      return state;
  }
}
