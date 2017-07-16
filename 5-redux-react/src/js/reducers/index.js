import { combineReducers } from "redux";

import tweets from "./tweetsReducer";
import user from "./userReducer";
import state from "./billingReducer";


export default combineReducers({
	tweets,
	user,
	state	
});
