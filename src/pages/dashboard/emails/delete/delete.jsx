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
import { deleteEmail } from "../../../../redux/slices/emails";

const DeleteEmail = () => {
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");
	const [inputTitle, setInputTitle] = useState("");

	const {
		me: { _id: userID },
	} = useSelector((state) => state.user);
	let { email } = useSelector((state) => state.emails);

	const token = localStorage.getItem("token");

	const { email : theEmail } = email;

	const theme = useTheme();
	const dispatch = useDispatch();

	const handleInputChange = (event) => {
		setInputTitle(event.target.value);
	};

	const handleDelete = async () => {
		try {
			const response = await dispatch(
				deleteEmail(userID, token, email._id)
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

	const isTitleMatch = inputTitle === theEmail;

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
				Please type the email to confirm deletion:
				<br />
				<span style={{ color: theme.palette.text.primary }}>
					{email.email}
				</span>
			</Typography>
			<TextField
				fullWidth
				variant="outlined"
				placeholder="Type email track number here"
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
				Delete this email
			</Button>
		</Stack>
	);
};

DeleteEmail.propTypes = {
	blog: PropTypes.object.isRequired,
};

export default DeleteEmail;
