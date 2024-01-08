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
import { deleteShipment } from "../../../../redux/slices/shipment";

const DeleteShipment = () => {
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");
	const [inputTitle, setInputTitle] = useState("");

	const {
		me: { _id: userID },
	} = useSelector((state) => state.user);
	let { shipment } = useSelector((state) => state.shipment);

	const token = localStorage.getItem("token");

	const { track_number } = shipment;

	const theme = useTheme();
	const dispatch = useDispatch();

	const handleInputChange = (event) => {
		setInputTitle(event.target.value);
	};

	const handleDelete = async () => {
		try {
			const response = await dispatch(
				deleteShipment(userID, token, shipment._id)
			);

			//extract success message
			const { success, message } = response;

			// Set the alert message from the response and determine severity
			setAlertMessage(message);
			setAlertSeverity(success ? "success" : "error");

			//close the modal
			if (success) {
				setTimeout(() => {
					window.location.reload();
				}, 2000);
			}
		} catch (error) {
			setAlertMessage(error.error || "An error occurred.");
			setAlertSeverity("error");
		}
	};

	const isTitleMatch = inputTitle === track_number;

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
				Please type the track_number of the shipment to confirm deletion:
				<br />
				<span style={{ color: theme.palette.text.primary }}>
					{track_number}
				</span>
			</Typography>
			<TextField
				fullWidth
				variant="outlined"
				placeholder="Type shipment track number here"
				value={inputTitle}
				onChange={handleInputChange}
				size="small"
			/>
			<Button
				variant="contained"
				color="error"
				endIcon={<Iconify icon="mdi:delete" />}
				onClick={handleDelete}
				disabled={!isTitleMatch}
			>
				Delete this shipment
			</Button>
		</Stack>
	);
};

DeleteShipment.propTypes = {
	blog: PropTypes.object.isRequired,
};

export default DeleteShipment;
