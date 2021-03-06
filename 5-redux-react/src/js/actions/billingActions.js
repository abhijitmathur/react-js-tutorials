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

export function setAgencyID(agencyID) {
  return {
    type: action.SET_AGENCY_ID,
    payload: agencyID
  };
}

export function setUserID(userID) {
  return {
    type: action.SET_USER_ID,
    payload: userID
  };
}

export function setSubmitterID(submitterID) {
  return {
    type: action.SET_SUBMITTER_ID,
    payload: submitterID
  };
}

export function queryAllAgencies(url) {
  return function(dispatch) {
    dispatch({ type: action.FETCHING_DATA });
    axios
      .get(url)
      .then(response => {
        dispatch({
          type: action.ALL_AGENCIES_DATA,
          payload: response.data.items
        });
      })
      .catch(error => {
        dispatch({ type: action.RECEIVED_ERROR, payload: error });
      });
  };
}

export function queryByAgency(url) {
  return function(dispatch) {
    dispatch({ type: action.FETCHING_DATA });
    axios
      .get(url)
      .then(response => {
        dispatch({
          type: action.SINGLE_AGENCY_DATA,
          payload: response.data.items
        });
      })
      .catch(error => {
        dispatch({ type: action.RECEIVED_ERROR, payload: error });
      });
  };
}

export function queryByUser(url) {
  return function(dispatch) {
    dispatch({ type: action.FETCHING_DATA });
    axios
      .get(url)
      .then(response => {
        dispatch({
          type: action.SINGLE_USER_DATA,
          payload: response.data.items
        });
      })
      .catch(error => {
        dispatch({ type: action.RECEIVED_ERROR, payload: error });
      });
  };
}

export function queryBySubmitterID(url) {
  return function(dispatch) {
    dispatch({ type: action.FETCHING_DATA });
    axios
      .get(url)
      .then(response => {
        dispatch({
          type: action.SUBMITTER_ID_DATA,
          payload: response.data.items
        });
      })
      .catch(error => {
        dispatch({ type: action.RECEIVED_ERROR, payload: error });
      });
  };
}