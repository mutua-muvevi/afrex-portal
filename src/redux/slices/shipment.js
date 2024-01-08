import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
	isLoading: false,

	shipments: null,
	shipmentsError: null,

	addShipment: null,
	addShipmentError: null,

	deleteShipment: null,
	deleteShipmentError: null,

	deleteManyShipments: null,
	deleteManyShipmentsError: null,

	fetchAllShipments: null,
	fetchAllShipmentsError: null,

	fetchSingleShipment: null,
	fetchSingleShipmentError: null,

	editShipment: null,
	editShipmentError: null,

	convertShipmentToClient: null,
	convertShipmentToClientError: null,
};

//the slice
const slice = createSlice({
	name: "shipments",
	initialState,
	reducers: {
		// START LOADING
		startLoading(state) {
			state.isLoading = true;
		},

		// STOP LOADING
		stopLoading(state) {
			state.isLoading = false;
		},

		//FETCH ALL LEADS
		fetchAllShipments(state, action) {
			state.isLoading = false;
			state.shipments = action.payload;
		},

		fetchAllShipmentsError(state, action) {
			state.isLoading = false;
			state.shipmentsError = action.payload;
		},

		//FETCH SINGLE LEAD
		fetchSingleShipment(state, action) {
			state.isLoading = false;
			state.fetchSingleShipment = action.payload;
		},

		fetchSingleShipmentError(state, action) {
			state.isLoading = false;
			state.fetchSingleShipmentError = action.payload;
		},

		// ADD LEAD
		addShipment(state, action) {
			state.isLoading = false;
			state.addShipment = action.payload;
		},

		addShipmentError(state, action) {
			state.isLoading = false;
			state.addShipmentError = action.payload;
		},

		//DELETE LEAD
		deleteShipment(state, action) {
			state.isLoading = false;
			state.deleteShipment = action.payload;
		},

		deleteShipmentError(state, action) {
			state.isLoading = false;
			state.deleteShipmentError = action.payload;
		},

		//DELETE MANY LEADS
		deleteManyShipments(state, action) {
			state.isLoading = false;
			state.deleteManyShipments = action.payload;
		},

		deleteManyShipmentsError(state, action) {
			state.isLoading = false;
			state.deleteManyShipmentsError = action.payload;
		},

		//SET LEAD
		setShipment(state, action) {
			state.isLoading = false;
			state.setShipment = action.payload;
		},

		setShipmentError(state, action) {
			state.isLoading = false;
			state.setShipmentError = action.payload;
		},

		// EDIT LEAD
		editShipment(state, action) {
			state.isLoading = false;
			state.editShipment = action.payload;
		},

		editShipmentError(state, action) {
			state.isLoading = false;
			state.editShipmentError = action.payload;
		},

		//CONVERT LEAD TO CLIENT
		convertShipmentToClient(state, action) {
			state.isLoading = false;
			state.convertShipmentToClient = action.payload;
		},

		convertShipmentToClientError(state, action) {
			state.isLoading = false;
			state.convertShipmentToClientError = action.payload;
		},
	},
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, stopLoading } = slice.actions;

// ----------------------------------------------------------------------

//---------------------------add shipment--------------------------------
export function addShipment(userID, token, values) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.post(
				`http://localhost:9900/api/shipment/${userID}/post`,
				values,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": token,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.addShipment(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.addShipmentError(error));
			throw error;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//---------------------------delete shipment--------------------------------
export function deleteShipment(userID, token, shipmentID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.delete(
				`http://localhost:9900/api/shipment/${userID}/delete/single/${shipmentID}`,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": token,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.deleteShipment(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.deleteShipmentError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//---------------------------delete many shipments--------------------------------
export function deleteManyShipments(userID, token, shipmentIDs) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.delete(
				`http://localhost:9900/api/shipment/${userID}/delete/many`,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": token,
					},
					data: {
						ids: shipmentIDs,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.deleteManyShipments(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.deleteManyShipmentsError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//---------------------------fetch all shipments--------------------------------
export function fetchAllShipments(token, userID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.get(
				`http://localhost:9900/api/shipment/${userID}/fetch/all`,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": token,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.fetchAllShipments(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.fetchAllShipmentsError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//---------------------------fetch single shipment--------------------------------
export function fetchSingleShipment(userID, token, shipmentID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.get(
				`http://localhost:9900/api/shipment/${userID}/fetch/single/${shipmentID}`,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": token,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.fetchSingleShipment(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.fetchSingleShipmentError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//---------------------------set shipment--------------------------------
export function setShipment(shipment) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			dispatch(slice.actions.setShipment(shipment));
			return shipment;
		} catch (error) {
			dispatch(slice.actions.setShipmentError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	}
}

//---------------------------edit shipment--------------------------------
export function editShipment(userID, token, shipmentID, values) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.put(
				`http://localhost:9900/api/shipment/${userID}/edit/${shipmentID}`,
				values,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": token,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.editShipment(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.editShipmentError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}