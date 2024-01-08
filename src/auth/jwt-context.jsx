	import PropTypes from "prop-types";
import {
	createContext,
	useEffect,
	useReducer,
	useCallback,
	useMemo,
} from "react";
// utils
import axios from "../utils/axios";
import localStorageAvailable from "../utils/localstorage-available";
//
import { isValidToken, setSession } from "./utils";
import { useDispatch } from "../redux/store";

//fetching initial data
import { fetchMe } from "../redux/slices/user";
import { fetchAllLeads } from "../redux/slices/leads";

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
	isInitialized: false,
	isAuthenticated: false,
	user: null,
};

const reducer = (state, action) => {
	if (action.type === "INITIAL") {
		return {
			isInitialized: true,
			isAuthenticated: action.payload.isAuthenticated,
			user: action.payload.user,
		};
	}
	if (action.type === "LOGIN") {
		return {
			...state,
			isAuthenticated: true,
			user: action.payload.user,
		};
	}
	if (action.type === "REGISTER") {
		return {
			...state,
			isAuthenticated: true,
			user: action.payload.user,
		};
	}
	if (action.type === "LOGOUT") {
		return {
			...state,
			isAuthenticated: false,
			user: null,
		};
	}

	return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
	children: PropTypes.node,
};

export function AuthProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const reduxDispatch = useDispatch();

	const storageAvailable = localStorageAvailable();

	const initialize = useCallback(async () => {
		try {
			const token = storageAvailable ? localStorage.getItem("token") : "";

			if (token && isValidToken(token)) {
				setSession(token);

				const response = await axios.get("/api/user/fetch/me", {
					headers: {
						Authorization: `${token}`,
					},
				});

				await reduxDispatch(fetchMe(token));

				const user = response.data.data;

				//await fetch all leads
				await reduxDispatch(fetchAllLeads(token, user._id));

				dispatch({
					type: "INITIAL",
					payload: {
						isAuthenticated: true,
						user,
					},
				});
			} else {
				dispatch({
					type: "INITIAL",
					payload: {
						isAuthenticated: false,
						user: null,
					},
				});
			}
		} catch (error) {
			console.error("Caught Error", error.response);
			dispatch({
				type: "INITIAL",
				payload: {
					isAuthenticated: false,
					user: null,
				},
			});
		}
	}, [storageAvailable, reduxDispatch]);

	useEffect(() => {
		initialize();
	}, [initialize]);

	// LOGIN
	const login = useCallback(async (email, password) => {
		try {
			const response = await axios.post("/api/user/login", {
				email,
				password,
			});
			const { token, user } = response.data;

			setSession(token);

			dispatch({
				type: "LOGIN",
				payload: {
					user,
				},
			});

			return response;
		} catch (error) {
			console.error("Caught Error", error);
			throw error;
		}
	}, []);

	// REGISTER
	const register = useCallback(async (email, password, fullname, country) => {
		const response = await axios.post("/api/user/register", {
			email,
			password,
			fullname,
			country,
		});

		const { token, user, message } = response.data;

		localStorage.setItem("token", token);

		dispatch({
			type: "REGISTER",
			payload: {
				user,
				message,
			},
		});
	}, []);

	// LOGOUT
	const logout = useCallback(() => {
		setSession(null);
		dispatch({
			type: "LOGOUT",
		});
	}, []);

	const memoizedValue = useMemo(
		() => ({
			isInitialized: state.isInitialized,
			isAuthenticated: state.isAuthenticated,
			user: state.user,
			method: "jwt",
			login,
			register,
			logout,
		}),
		[
			state.isAuthenticated,
			state.isInitialized,
			state.user,
			login,
			logout,
			register,
		]
	);

	return (
		<AuthContext.Provider value={memoizedValue}>
			{children}
		</AuthContext.Provider>
	);
}
