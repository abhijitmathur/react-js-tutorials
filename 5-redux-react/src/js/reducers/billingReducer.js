import * as types from "../constants/type";

export default function reducer(
  state = {
    startDate: "",
    endDate: "",
    allAgencyData: [],
    fetching: false,
    fetched: false,
    error: ""
  },
  action
) {
  switch (action.type) {
    case types.SET_START_DATE: {
      return { ...state, startDate: action.payload };
    }
    case types.SET_END_DATE: {
      return { ...state, endDate: action.payload };
    }
    case types.ALL_AGENCIES_DATA: {
      return { ...state, allAgencyData: action.payload };
    }
    case types.RECEIVED_ERROR: {
      return { ...state, error: action.payload };
    }
  }

  return state;
}
