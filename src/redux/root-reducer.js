import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

// slices
import UserReducer from "./slices/user";
import LeadsReducer from "./slices/leads";
import ShipmentReducer from "./slices/shipment";
import StorageReducer from "./slices/storage";
import EmailsReducer from "./slices/emails";
import FlightReducer from "./slices/flights";

// ----------------------------------------------------------------------

const config = {
	key: "root",
	storage,
	whitelist: [
		"user",
		"leads",
		"shipment",
		"emails",
		"flights",
	],
	blacklist: [],
};

export const rootReducer = combineReducers({
	user: UserReducer,
	leads: LeadsReducer,
	shipment: ShipmentReducer,
	storage: StorageReducer,
	emails: EmailsReducer,
	flights: FlightReducer,
});

const persistedReducer = persistReducer(config, rootReducer);

export default persistedReducer;
