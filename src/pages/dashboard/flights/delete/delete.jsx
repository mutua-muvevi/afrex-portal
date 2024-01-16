import { useState } from "react";
import {
	Typography,
	Stack,
	Button,
	TextField,
	useTheme,
	Alert,
} from "@mui/material";
import PropTypes from "prop-types";
import Iconify from "../../../../components/iconify";
import { useDispatch, useSelector } from "../../../../redux/store";
import { deleteFlight } from "../../../../redux/slices/flights";

const DeleteFlight = ({ onClose }) => {
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");
	const [inputID, setInputID] = useState("");

	const {
		me: { _id: userID },
	} = useSelector((state) => state.user);

	const { setFlight: flight } = useSelector((state) => state.flights);

	const token = localStorage.getItem("token");

	const { _id } = flight

	const theme = useTheme();
	const dispatch = useDispatch();

	const handleInputChange = (event) => {
		setInputID(event.target.value);
	};

	
	const handleDelete = async () => {
		try {
			const response = await dispatch(
				deleteFlight(userID, token, flight._id)
			);

			//extract success message
			const { success, message } = response;

			// Set the alert message from the response and determine severity
			setAlertMessage(message);
			setAlertSeverity(success ? "success" : "error");

			//close the modal
			if (success) {
				setTimeout(() => {
					onClose();
					window.location.reload();
				}, 2000);
			}
		} catch (error) {
			setAlertMessage(error.error || "An error occurred.");
			setAlertSeverity("error");
		}
	};

	const isIDMatch = inputID === _id;


	return (
		<Stack direction="column" spacing={3}>
			{alertMessage && (
				<Alert
					severity={alertSeverity}
				>
					{alertMessage}
				</Alert>
			)}
			<Typography variant="subtitle1" color="primary">
				Please type the title of the flight to confirm deletion:
				<br />
				<span style={{ color: theme.palette.text.primary }}>
					{flight._id}
				</span>
			</Typography>
			<TextField
				fullWidth
				variant="outlined"
				placeholder="Type flight Id here"
				value={inputID}
				onChange={handleInputChange}
				size="small"
			/>
			<Button
				variant="contained"
				color="error"
				endIcon={<Iconify icon="mdi:delete" />}
				onClick={handleDelete}
				disabled={!isIDMatch}
				type="submit"
			>
				Delete this flight
			</Button>
		</Stack>
	);
}

DeleteFlight.propTypes = {
	onClose: PropTypes.func.isRequired,
};

export default DeleteFlight
