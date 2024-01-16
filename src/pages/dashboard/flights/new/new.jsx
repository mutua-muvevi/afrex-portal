import { useState, useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
	Alert,
	Box,
	Button,
	Stack,
	Step,
	StepLabel,
	Stepper,
} from "@mui/material";

import Iconify from "../../../../components/iconify";
import { addFlight } from "../../../../redux/slices/flights";
import { useDispatch, useSelector } from "../../../../redux/store";
import FlightAirplane from "./airplane";
import FlightDeparture from "./departure";
import FlightArrival from "./arrival";
import FlightStatus from "./status";
import FlightOrigin from "./origin";
import FlightDestination from "./destination";
import FlightPreview from "./preview";

const initialValues = {
	airplane: {
		airline: "",
		aircraft: "",
		regNo: "",
	},
	departureTime: {
		date: "",
		time: "",
		timezone: "",
	},
	arrivalTime: {
		date: "",
		time: "",
		timezone: "",
	},
	status: {
		title: "",
		description: "",
	},
	originAirport: {
		name: "",
		city: "",
		country: "",
	},
	destinationAirport: {
		name: "",
		city: "",
		country: "",
	},
};

const validationSchema = Yup.object().shape({
	airplane: Yup.object().shape({
		airline: Yup.string().required("Required"),
		aircraft: Yup.string().required("Required"),
		regNo: Yup.string().required("Required"),
	}),
	departureTime: Yup.object().shape({
		date: Yup.string().required("Required"),
		time: Yup.string().required("Required"),
		timezone: Yup.string().required("Required"),
	}),
	arrivalTime: Yup.object().shape({
		date: Yup.string().required("Required"),
		time: Yup.string().required("Required"),
		timezone: Yup.string().required("Required"),
	}),
	status: Yup.object().shape({
		title: Yup.string().required("Required"),
		description: Yup.string().required("Required"),
	}),
	originAirport: Yup.object().shape({
		name: Yup.string().required("Required"),
		city: Yup.string().required("Required"),
		country: Yup.string().required("Required"),
	}),
	destinationAirport: Yup.object().shape({
		name: Yup.string().required("Required"),
		city: Yup.string().required("Required"),
		country: Yup.string().required("Required"),
	}),
});

const steps = [
	"Airplane",
	"Departure Time",
	"Arrival Time",
	"Status",
	"Origin Airport",
	"Destination Airport",
	"Submit",
];

const NewFlight = () => {
	const [activeStep, setActiveStep] = useState(0);

	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");

	const token = localStorage.getItem("token");
	const { me } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleNext = useCallback(() => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	}, []);

	const handleBack = useCallback(() => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	}, []);

	const handleSubmit = async (values) => {
		try {
			console.log("Values: ", values);
			const response = await dispatch(addFlight(me._id, token, values));
			// extract success message
			const { success, message } = response;

			// Set the alert message from the response and determine severity
			setAlertMessage(message);
			setAlertSeverity(success ? "success" : "error");

			// close the modal
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
	return (
		<>
			<Stack sx={{ pr: 2, mb: 3 }}>
				<Stepper
					activeStep={activeStep}
					alternativeLabel
					sx={{ mb: 3 }}
				>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ values, setFieldValue, isSubmitting }) => (
						<Form>
							{alertMessage && (
								<Alert severity={alertSeverity} sx={{ mb: 2 }}>
									{alertMessage}
								</Alert>
							)}
							{activeStep === 0 && (
								<FlightAirplane
									values={values}
									setFieldValue={setFieldValue}
								/>
							)}
							{activeStep === 1 && (
								<FlightDeparture
									values={values}
									setFieldValue={setFieldValue}
								/>
							)}
							{activeStep === 2 && (
								<FlightArrival
									values={values}
									setFieldValue={setFieldValue}
								/>
							)}
							{activeStep === 3 && (
								<FlightStatus
									values={values}
									setFieldValue={setFieldValue}
								/>
							)}
							{activeStep === 4 && (
								<FlightOrigin
									values={values}
									setFieldValue={setFieldValue}
								/>
							)}
							{activeStep === 5 && (
								<FlightDestination
									values={values}
									setFieldValue={setFieldValue}
								/>
							)}
							{activeStep === 6 && (
								<FlightPreview
									values={values}
									setFieldValue={setFieldValue}
								/>
							)}
							{console.log("THE ACTIVESTEP IS: ", activeStep)}

							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									pt: 2,
								}}
							>
								<Button
									color="inherit"
									disabled={activeStep === 0}
									onClick={handleBack}
									sx={{ mr: 1 }}
									startIcon={
										<Iconify icon="mdi:arrow-left" />
									}
									variant="outlined"
								>
									Back
								</Button>
								<Box sx={{ flex: "1 1 auto" }} />
								{activeStep === steps.length - 1 ? (
									// 'Submit' button on the final step
									<Button
										variant="contained"
										disabled={isSubmitting}
										endIcon={<Iconify icon="mdi:check" />}
										onClick={() => handleSubmit(values)}
									>
										Submit
									</Button>
								) : (
									// 'Next' button on all other steps
									<Button
										variant="contained"
										type="button"
										onClick={handleNext}
										endIcon={
											<Iconify icon="mdi:arrow-right" />
										}
										// disabled={!isValid }
									>
										Next
									</Button>
								)}
							</Box>
						</Form>
					)}
				</Formik>
			</Stack>
		</>
	);
};

export default NewFlight;
