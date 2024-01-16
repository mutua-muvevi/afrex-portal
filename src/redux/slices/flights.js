import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
	isLoading: false,

	flights: null,
	flightsError: null,

	addFlight: null,
	addFlightError: null,

	deleteFlight: null,
	deleteFlightError: null,

	flight: null,
	flightError: null,

	editFlight: null,
	editFlightError: null,
};

//the slice
const slice = createSlice({
	name: "flights",
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
		fetchAllFlights(state, action) {
			state.isLoading = false;
			state.flights = action.payload;
		},

		fetchAllFlightsError(state, action) {
			state.isLoading = false;
			state.flightsError = action.payload;
		},

		//FETCH SINGLE LEAD
		fetchSingleFlight(state, action) {
			state.isLoading = false;
			state.flight = action.payload;
		},

		fetchSingleFlightError(state, action) {
			state.isLoading = false;
			state.flightError = action.payload;
		},

		//ADD LEAD
		addFlight(state, action) {
			state.isLoading = false;
			state.addFlight = action.payload;
		},

		addFlightError(state, action) {
			state.isLoading = false;
			state.addFlightError = action.payload;
		},

		//DELETE LEAD
		deleteFlight(state, action) {
			state.isLoading = false;
			state.deleteFlight = action.payload;
		},

		deleteFlightError(state, action) {
			state.isLoading = false;
			state.deleteFlightError = action.payload;
		},

		//EDIT LEAD
		editFlight(state, action) {
			state.isLoading = false;
			state.editFlight = action.payload;
		},

		editFlightError(state, action) {
			state.isLoading = false;
			state.editFlightError = action.payload;
		},
	},
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, stopLoading } = slice.actions;

// ------------------------------------fetch flights----------------------------------
export function fetchAllFlights(userID, token) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.get(
				`http://localhost:9900/api/flight/${userID}/fetch/all`,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": token,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.fetchAllFlights(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.fetchAllFlightsError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}


// -----------------------add flight--------------------------------
export function addFlight(userID, token, values) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.post(
				`http://localhost:9900/api/flight/${userID}/post`,
				values,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": token,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.addFlight(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.addFlightError(error));
			throw error;

		} finally {
			dispatch(stopLoading());
		}
	};
}

// -----------------------delete flight--------------------------------
export function deleteFlight(userID, token, flightID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.delete(
				`http://localhost:9900/api/flight/${userID}/delete/single/${flightID}`,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": token,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.deleteFlight(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.deleteFlightError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}

// -----------------------edit flight--------------------------------
export function editFlight(userID, token, flightID, values) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.put(
				`http://localhost:9900/api/flight/${userID}/edit/${flightID}`,
				values,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": token,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.editFlight(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.editFlightError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}