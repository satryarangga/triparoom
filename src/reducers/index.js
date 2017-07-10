import { combineReducers } from 'redux';
import tokenReducer from './reducerToken';
import hotelReducer from './reducerHotel';

const rootReducer = combineReducers({
  // token: tokenReducer,
  hotel: hotelReducer,
});

export default rootReducer;
