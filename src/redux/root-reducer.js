import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

// slices
import UserReducer from "./slices/user";
import LeadsReducer from "./slices/leads";
import ShipmentReducer from "./slices/shipment";

// ----------------------------------------------------------------------

const config = {
	key: "root",
	storage,
	whitelist: [
		"user",
		"leads",
		"shipment"
	],
	blacklist: [],
};

export const rootReducer = combineReducers({
	user: UserReducer,
	leads: LeadsReducer,
	shipment: ShipmentReducer
});

const persistedReducer = persistReducer(config, rootReducer);

export default persistedReducer;
