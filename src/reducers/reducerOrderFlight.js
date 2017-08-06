import { FETCH_FLIGHT_DATA, ADD_FLIGHT_ORDER, FETCH_FLIGHT_ORDER } from '../actions/actionOrderFlight';
import { formatOrderFlightState, formatMandatoryField } from '../utils/formatter';
import _ from 'lodash';

export default function (state = { departure: {}, return: {}, required: {}, order: {} }, action) {
  switch(action.type) {
    case FETCH_FLIGHT_DATA:
      return {
        ...state,
          departure: (action.payload.data.departures) ? action.payload.data.departures : {},
          return: (action.payload.data.returns) ? action.payload.data.returns : {},
          required: formatMandatoryField(action.payload.data.required)
      }
    case ADD_FLIGHT_ORDER:
      return state;
    case FETCH_FLIGHT_ORDER:
      return {
        ...state,
          order: formatOrderFlightState(action.payload.data)
      }
    default:
      return state;
  }
}
