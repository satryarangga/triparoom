import _ from 'lodash';
import { FETCH_HOME_HOTEL } from '../actions/actionHotel';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_HOME_HOTEL:
      return _.mapKeys(action.payload.data.results.result, 'id');
    default:
      return state;
  }
}
