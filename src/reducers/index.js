import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import hotelReducer from './reducerHotel';
import flightReducer from './reducerFlight';
import orderHotelReducer from './reducerOrderHotel';
import orderFlightReducer from './reducerOrderFlight';

const rootReducer = combineReducers({
  orderHotel: orderHotelReducer,
  orderFlight: orderFlightReducer,
  hotel: hotelReducer,
  flight: flightReducer,
  form: formReducer
});

export default rootReducer;
