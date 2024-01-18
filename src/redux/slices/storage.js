import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
	isLoading: false,

	storages: null,
	storagesError: null,

	addStorage: null,
	addStorageError: null,

	deleteStorage: null,
	deleteStorageError: null,

	deleteManyStorages: null,
	deleteManyStoragesError: null,

	fetchAllStorages: null,
	fetchAllStoragesError: null,

	fetchSingleStorage: null,
	fetchSingleStorageError: null,

	editStorage: null,
	editStorageError: null,

	storage: null,
	storageError: null,
};

//the slice
const slice = createSlice({
	name: "storages",
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
		fetchAllStorages(state, action) {
			state.isLoading = false;
			state.storages = action.payload;
		},

		fetchAllStoragesError(state, action) {
			state.isLoading = false;
			state.storagesError = action.payload;
		},

		//FETCH SINGLE LEAD
		fetchSingleStorage(state, action) {
			state.isLoading = false;
			state.fetchSingleStorage = action.payload;
		},

		fetchSingleStorageError(state, action) {
			state.isLoading = false;
			state.fetchSingleStorageError = action.payload;
		},

		// ADD LEAD
		addStorage(state, action) {
			state.isLoading = false;
			state.addStorage = action.payload;
		},

		addStorageError(state, action) {
			state.isLoading = false;
			state.addStorageError = action.payload;
		},

		//DELETE LEAD
		deleteStorage(state, action) {
			state.isLoading = false;
			state.deleteStorage = action.payload;
		},

		deleteStorageError(state, action) {
			state.isLoading = false;
			state.deleteStorageError = action.payload;
		},

		//DELETE MANY LEADS
		deleteManyStorages(state, action) {
			state.isLoading = false;
			state.deleteManyStorages = action.payload;
		},

		deleteManyStoragesError(state, action) {
			state.isLoading = false;
			state.deleteManyStoragesError = action.payload;
		},

		//SET LEAD
		setStorage(state, action) {
			state.isLoading = false;
			state.storage = action.payload;
		},

		setStorageError(state, action) {
			state.isLoading = false;
			state.storageError = action.payload;
		},

		// EDIT LEAD
		editStorage(state, action) {
			state.isLoading = false;
			state.editStorage = action.payload;
		},

		editStorageError(state, action) {
			state.isLoading = false;
			state.editStorageError = action.payload;
		},

		//CONVERT LEAD TO CLIENT
		convertStorageToClient(state, action) {
			state.isLoading = false;
			state.convertStorageToClient = action.payload;
		},

		convertStorageToClientError(state, action) {
			state.isLoading = false;
			state.convertStorageToClientError = action.payload;
		},
	},
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, stopLoading } = slice.actions;

// ----------------------------------------------------------------------

//---------------------------add storage--------------------------------
export function addStorage(userID, token, values) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.post(
				`https://afrex-bridge-connections-server.onrender.com/api/storage/${userID}/post`,
				values,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": token,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.addStorage(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.addStorageError(error));
			throw error;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//---------------------------delete storage--------------------------------
export function deleteStorage(userID, token, storageID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.delete(
				`https://afrex-bridge-connections-server.onrender.com/api/storage/${userID}/delete/single/${storageID}`,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": token,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.deleteStorage(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.deleteStorageError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}


//---------------------------fetch all storages--------------------------------
export function fetchAllStorages() {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.get(
				`https://afrex-bridge-connections-server.onrender.com/api/storage/fetch/all`,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.fetchAllStorages(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.fetchAllStoragesError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//---------------------------fetch single storage--------------------------------
export function fetchSingleStorage(storageID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.get(
				`https://afrex-bridge-connections-server.onrender.com/api/storage/fetch/single/${storageID}`,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.fetchSingleStorage(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.fetchSingleStorageError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//---------------------------set storage--------------------------------
export function setStorage(storage) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			dispatch(slice.actions.setStorage(storage));
			return storage;
		} catch (error) {
			dispatch(slice.actions.setStorageError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	}
}

//---------------------------edit storage--------------------------------
export function editStorage(userID, token, storageID, values) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {console.log("Values", values)
			const response = await axios.put(
				`https://afrex-bridge-connections-server.onrender.com/api/storage/${userID}/edit/${storageID}`,
				values,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": token,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.editStorage(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.editStorageError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}