import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

// slices
import UserReducer from "./slices/user";
import LeadsReducer from "./slices/leads";

// ----------------------------------------------------------------------

const config = {
	key: "root",
	storage,
	whitelist: [
		"user",
		"leads",
	],
	blacklist: [],
};

export const rootReducer = combineReducers({
	user: UserReducer,
	leads: LeadsReducer,
});

const persistedReducer = persistReducer(config, rootReducer);

export default persistedReducer;
