import * as types from "../constants/type";

export default function reducer(
  state = {
    startDate: "",
    endDate: "",
    agencyID: "",
    userID: "",
    submitterID: "",
    allAgencyData: [],
    dataType: "",
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

    case types.SET_AGENCY_ID: {
      return { ...state, agencyID: action.payload };
    }

    case types.SET_USER_ID: {
      return { ...state, userID: action.payload };
    }

    case types.SET_SUBMITTER_ID: {
      return { ...state, submitterID: action.payload };
    }

    case types.ALL_AGENCIES_DATA: {
      return {
        ...state,
        allAgencyData: action.payload,
        dataType: types.ALL_AGENCIES_DATA
      };
    }

    case types.SINGLE_AGENCY_DATA: {
      return {
        ...state,
        allAgencyData: action.payload,
        dataType: types.SINGLE_AGENCY_DATA
      };
    }

    case types.SINGLE_USER_DATA: {
      return {
        ...state,
        allAgencyData: action.payload,
        dataType: types.SINGLE_USER_DATA
      };
    }

    case types.SUBMITTER_ID_DATA: {
      return {
        ...state,
        allAgencyData: action.payload,
        dataType: types.SUBMITTER_ID_DATA
      };
    }

    case types.RECEIVED_ERROR: {
      return { ...state, error: action.payload };
    }

    default:
      return { ...state, dataType: "" };
  }
}
