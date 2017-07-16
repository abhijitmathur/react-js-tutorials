import * as action from "../constants/type";
import axios from "axios";

export function setStartDate(date) {
  return {
    type: action.SET_START_DATE,
    payload: date
  };
}

export function setEndDate(date) {
  return {
    type: action.SET_END_DATE,
    payload: date
  };
}

export function queryAllAgencies(url) {
  return function(dispatch) {
    dispatch({ type: action.FETCHING_DATA });
    axios
      .get(url)
      .then(response => {
        dispatch({ type: action.ALL_AGENCIES_DATA, payload: response.data.items });
      })
      .catch(error => {
        dispatch({ type: action.RECEIVED_ERROR, payload: error });
      });
  };
}
