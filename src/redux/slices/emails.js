import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
	isLoading: false,

	emails: null,
	emailsError: null,

	addEmail: null,
	addEmailError: null,

	deleteEmail: null,
	deleteEmailError: null,

	email: null,
	emailError: null,
};

//the slice
const slice = createSlice({
	name: "emails",
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
		fetchAllEmails(state, action) {
			state.isLoading = false;
			state.emails = action.payload;
		},

		fetchAllEmailsError(state, action) {
			state.isLoading = false;
			state.emailsError = action.payload;
		},

		//FETCH SINGLE LEAD
		fetchSingleEmail(state, action) {
			state.isLoading = false;
			state.email = action.payload;
		},

		fetchSingleEmailError(state, action) {
			state.isLoading = false;
			state.emailError = action.payload;
		},

		//ADD LEAD
		addEmail(state, action) {
			state.isLoading = false;
			state.addEmail = action.payload;
		},

		addEmailError(state, action) {
			state.isLoading = false;
			state.addEmailError = action.payload;
		},

		//DELETE LEAD
		deleteEmail(state, action) {
			state.isLoading = false;
			state.deleteEmail = action.payload;
		},

		deleteEmailError(state, action) {
			state.isLoading = false;
			state.deleteEmailError = action.payload;
		},

		//SET EMAIL
		setEmail(state, action) {
			state.isLoading = false;
			state.email = action.payload;
		},

		setEmailError(state, action) {
			state.isLoading = false;
			state.emailError = action.payload;
		},
	},
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, stopLoading } = slice.actions;

// ----------------------------------------------------------------------

//-------------------------set emails--------------------------------
//---------------------------set shipment--------------------------------
export function setEmail(shipment) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			dispatch(slice.actions.setEmail(shipment));
			return shipment;
		} catch (error) {
			dispatch(slice.actions.setEmailError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	}
}


//--------------------------------fetch emails--------------------------------
export function fetchAllEmails(userID, token) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.get(
				`http://localhost:9900/api/email/${userID}/fetch/all`,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": token,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.fetchAllEmails(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.fetchAllEmailsError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//--------------------------------set single Email--------------------------------
export function setSingleEmail(email) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			dispatch(slice.actions.fetchSingleEmail(email));
			return email;

		} catch (error) {
			dispatch(slice.actions.fetchSingleEmailError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//--------------------------------add email--------------------------------
export function addEmail(userID, token, email) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.post(
				`http://localhost:9900/api/email/${userID}/add`,
				{
					email,
				},
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": token,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.addEmail(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.addEmailError(error));
			throw error;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//--------------------------------delete email--------------------------------
export function deleteEmail(userID, token, emailID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.delete(
				`http://localhost:9900/api/email/${userID}/delete/single/${emailID}`,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": token,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.deleteEmail(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.deleteEmailError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}

