import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import hotelReducer from './reducerHotel';
import orderHotelReducer from './reducerOrderHotel';

const rootReducer = combineReducers({
  orderHotel: orderHotelReducer,
  hotel: hotelReducer,
  form: formReducer
});

export default rootReducer;
