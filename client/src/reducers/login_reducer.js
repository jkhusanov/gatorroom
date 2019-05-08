import { FETCH_LOGIN } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_LOGIN:
      return action.payload;
    default:
      return state;
  }
}
