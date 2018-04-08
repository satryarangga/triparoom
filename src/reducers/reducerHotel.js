import _ from 'lodash'; 
import { FETCH_HOTEL_LIST, SORT_HOTEL_LIST, CLEAR_HOTEL_PAGINATION, CLEAR_HOTEL_SEARCH, FETCH_DETAIL_HOTEL } from '../actions/actionHotel';
import { formatDetailState } from '../utils/formatter';

export default function (state = {result:{}, pagination:{}, queries:{}, detail:{}}, action) {
  switch (action.type) {
    case FETCH_HOTEL_LIST:
      return {
        ...state,
        result: _.mapKeys(action.payload.data.results.result, 'hotel_id'),
        pagination: action.payload.data.pagination,
        queries: action.payload.data.search_queries,
        detail: {}
      };
    case CLEAR_HOTEL_PAGINATION:
      return {
        ...state,
          result: {}
      };
    case CLEAR_HOTEL_SEARCH:
      return {
        ...state,
        result: {},
        pagination: {},
        queries: {},
        detail: {}
      };
    case SORT_HOTEL_LIST:
      _.mapKeys(state.result, res => {
        if(!_.isNumber(res.total_price)){
          state.result[res.hotel_id].total_price = _.parseInt(res.total_price);
        }
        if(!_.isNumber(res.rating)){
          state.result[res.hotel_id].rating = _.parseInt(_.round(res.rating));
        }
      },'id');
        return {
          ...state,
            result: _.sortByOrder(state.result, action.sortField, action.sortType)
        }
    case FETCH_DETAIL_HOTEL:
      return {
        ...state,
          detail: formatDetailState(action.payload.data)
      }
    default:
      return state;
  }
}
