import { GET_TOKEN } from '../actions/actionToken';

export default function (state = {}, action) {
  switch (action.type){
    case GET_TOKEN:
      return action.payload.data.token;
    default:
      return state;
  }
}
