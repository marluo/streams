import _ from "lodash";
import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from "../actions/types";

/* Vi returnerar dessa som objekt, och inte som array för att det är lättare att arbeta med. */

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    //array med id som key
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    //Vi gör på detta sätt, eftersom att inte vill modifiera gamla state på något sätt.
    //Om vi te.x refreshar på en sida som inte fetchar allt, får vi bara ett resultat, annars inte. Då "skriver vi bara över"
    //samma info.
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    //deletear ID action - payload
    default:
      return state;
  }
};
