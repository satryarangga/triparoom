import { FETCH_ORDER, ADD_ORDER } from '../actions/actionOrderHotel';
import { formatOrderState } from '../utils/formatter';

export default function (state = {}, action) {
  switch (action.type){
    case FETCH_ORDER:
      return formatOrderState(action.payload.data);
    case ADD_ORDER:
      return state;
    default:
      return state;
  }
}
