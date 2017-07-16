import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import hotelReducer from './reducerHotel';

const rootReducer = combineReducers({
  hotel: hotelReducer,
  form: formReducer
});

export default rootReducer;
