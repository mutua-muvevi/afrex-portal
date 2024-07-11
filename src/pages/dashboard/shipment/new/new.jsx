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
	Typography,
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

import ShippingItems from "./items";
import ShipmentShippers from "./shipper";
import ShipmentConsignee from "./cosignee";
import ShipmentPreview from "./preview";
import ShipmentCollector from "./collector";
import ShippingEvents from "./events";
import ShippingDeparture from "./departure";
import ShippingArrival from "./arrival";
import Iconify from "../../../../components/iconify";
import { addShipment } from "../../../../redux/slices/shipment";
import { useDispatch, useSelector } from "../../../../redux/store";
import { isObjectEmpty } from "../../../../utils/object";

const initialValues = {
	shipper: {
		fullname: "",
		company: "",
		address: "",
		telephone: "",
		email: "",
	},

	consignee: {
		fullname: "",
		company: "",
		address: "",
		telephone: "",
		email: "",
	},

	collector: {
		fullname: "",
		company: "",
		address: "",
		telephone: "",
		email: "",
	},

	departure: {
		origin: "",
		destination: "",
		departure_date: "",
		departure_time: "",
		departure_flight: "",
		departure_airline: "",
	},

	arrival: {
		origin: "",
		destination: "",
		arrival_date: "",
		arrival_time: "",
		arrival_flight: "",
		arrival_airline: "",
	},

	items: [
		{
			description: "",
			unit: "",
			weight: "",
			amount: "",
		},
	],

	events: [
		{
			date: "",
			time: "",
			address: "",
			status: "",
			description: "",
		},
	],

	track_number: "",
};

const validationSchema = Yup.object().shape({
	shipper: Yup.object().shape({
		fullname: Yup.string().required("The shipper's name is Required"),
		company: Yup.string(),
		address: Yup.string().required(" The address of shipper is Required"),
		telephone: Yup.string().required(
			"The phone number of shipper is Required"
		),
		email: Yup.string().email("Invalid email").required("Required"),
	}),

	cosignee: Yup.object().shape({
		fullname: Yup.string().required("The name of cosignee is Required"),
		company: Yup.string(),
		address: Yup.string().required("The address of cosignee is Required"),
		telephone: Yup.string(),
		email: Yup.string().email("Invalid email").required("Required"),
	}),

	collector: Yup.object().shape({
		fullname: Yup.string().required("The collector's name is Required"),
		company: Yup.string(),
		address: Yup.string().required("The collector's address is Required"),
		telephone: Yup.string(),
		email: Yup.string()
			.email("Invalid email")
			.required("The collector's email is Required"),
	}),

	departure: Yup.object().shape({
		address: Yup.string().required("The address of departure is Required"),
		airport_code: Yup.string().required(
			"The airport code of departure is Required"
		),
		departure_date: Yup.string().required(
			"The date of departure is Required"
		),
		departure_time: Yup.string().required(
			"The time of departure is Required"
		),
	}),

	arrival: Yup.object().shape({
		address: Yup.string().required("Address of Destination is Required"),
		airport_code: Yup.string().required(
			"Airport code of Destination is Required"
		),
		arrival_date: Yup.string(),
		arrival_time: Yup.string(),
	}),

	items: Yup.array().of(
		Yup.object().shape({
			description: Yup.string(),
			unit: Yup.string().required("Unit of measurement is Required"),
			weight: Yup.string().required("Weight of the item is Required"),
			amount: Yup.string(),
		})
	),

	events: Yup.array().of(
		Yup.object().shape({
			date: Yup.string().required("Date of the event is Required"),
			time: Yup.string().required("Time of the event is Required"),
			address: Yup.string().required(
				"The address of the event is Required"
			),
			status: Yup.string().required(
				"The status of the event is Required"
			),
			description: Yup.string().required(
				"The description of the event is Required"
			),
		})
	),

	track_number: Yup.string().required(
		"Track number for this shipment is Required"
	),
});

const steps = [
	"Shipper",
	"Consignee",
	"Collector",
	"Departure",
	"Arrival",
	"Items",
	"Events",
	"Preview",
];

const AddShipment = () => {
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
			const response = await dispatch(addShipment(me._id, token, values));
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
					{({ values, setFieldValue, isSubmitting, errors, isValid, dirty }) => (
						<Form>
							{
								!dirty && (
									<Alert severity="error" sx={{mb: 3}}>
										<Typography>
											You haven&apos;t made any changes.
										</Typography>
									</Alert>
								)
							}
							{!isObjectEmpty(errors) && (
								<Alert severity="error" sx={{ mb: 3 }}>
									<Typography>
										{JSON.stringify(errors)}
									</Typography>
								</Alert>
							)}

							{alertMessage && (
								<Alert severity={alertSeverity} sx={{ mb: 2 }}>
									{alertMessage}
								</Alert>
							)}

							{activeStep === 0 && (
								<ShipmentShippers
									values={values}
									setFieldValue={setFieldValue}
								/>
							)}

							{activeStep === 1 && (
								<ShipmentConsignee
									values={values}
									setFieldValue={setFieldValue}
								/>
							)}

							{activeStep === 2 && (
								<ShipmentCollector
									values={values}
									setFieldValue={setFieldValue}
								/>
							)}

							{activeStep === 3 && (
								<ShippingDeparture
									values={values}
									setFieldValue={setFieldValue}
								/>
							)}

							{activeStep === 4 && (
								<ShippingArrival
									values={values}
									setFieldValue={setFieldValue}
								/>
							)}

							{activeStep === 5 && (
								<ShippingItems
									values={values}
									setFieldValue={setFieldValue}
								/>
							)}

							{activeStep === 6 && (
								<ShippingEvents
									values={values}
									setFieldValue={setFieldValue}
								/>
							)}

							{activeStep === 7 && (
								<ShipmentPreview
									values={values}
									setFieldValue={setFieldValue}
								/>
							)}

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
										disabled={isSubmitting || !isValid || !dirty}
										endIcon={<Iconify icon="mdi:check" />}
										onClick={() => handleSubmit(values)}
										startIcon={isSubmitting ? <CircularProgress size={24} /> : null}
									>
										{isSubmitting ? "Submitting, Please Wait..."  : "Submit"}
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

export default AddShipment;
