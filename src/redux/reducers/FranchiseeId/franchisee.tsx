import {
  SET_FRANCHISEE_ID,
  SET_FRANCHISEE_NAME,
  RESET_SELECTIONS,
  SET_PICKUP_POINT_DETAILS,
} from "../../actions/combineAction";

const initialState = {
  franchiseeId: null,
  pickupPointId: null,
  pickupPointDetails: null,
};

const franchiseeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FRANCHISEE_ID:
      return {
        ...state,
        franchiseeId: action.payload,
      };

    case SET_FRANCHISEE_NAME:
      return {
        ...state,
        franchiseeName: action.payload,
      };

    case SET_PICKUP_POINT_DETAILS:
      return {
        ...state,
        pickupPointDetails: action.payload,
      };
    case RESET_SELECTIONS:
      return initialState;
    default:
      return state;
  }
};

export default franchiseeReducer;
