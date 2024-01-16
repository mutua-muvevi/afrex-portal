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

import ShippingItems from "./items";
import ShipmentShippers from "./shipper";
import ShipmentConsignee from "./cosignee";
import ShipmentPreview from "./preview";
import ShipmentCollector from "./collector";
import ShippingEvents from "./events";
import ShippingDeparture from "./departure";
import ShippingArrival from "./arrival";
import Iconify from "../../../../components/iconify";
import { editShipment } from "../../../../redux/slices/shipment";
import { useDispatch, useSelector } from "../../../../redux/store";

const validationSchema = Yup.object().shape({
	shipper: Yup.object().shape({
		fullname: Yup.string().required("Required"),
		company: Yup.string().required("Required"),
		address: Yup.string().required("Required"),
		telephone: Yup.string().required("Required"),
		email: Yup.string().email("Invalid email").required("Required"),
	}),

	cosignee: Yup.object().shape({
		fullname: Yup.string().required("Required"),
		company: Yup.string().required("Required"),
		address: Yup.string().required("Required"),
		telephone: Yup.string().required("Required"),
		email: Yup.string().email("Invalid email").required("Required"),
	}),

	collector: Yup.object().shape({
		fullname: Yup.string().required("Required"),
		company: Yup.string().required("Required"),
		address: Yup.string().required("Required"),
		telephone: Yup.string().required("Required"),
		email: Yup.string().email("Invalid email").required("Required"),
	}),

	departure: Yup.object().shape({
		address: Yup.string().required("Required"),
		airport_code: Yup.string().required("Required"),
		departure_date: Yup.string().required("Required"),
		departure_time: Yup.string().required("Required"),
	}),

	arrival: Yup.object().shape({
		address: Yup.string().required("Required"),
		airport_code: Yup.string().required("Required"),
		arrival_date: Yup.string().required("Required"),
		arrival_time: Yup.string().required("Required"),
	}),

	items: Yup.array().of(
		Yup.object().shape({
			description: Yup.string(),
			unit: Yup.string().required("Required"),
			weight: Yup.string().required("Required"),
			amount: Yup.string().required("Required"),
		})
	),

	events: Yup.array().of(
		Yup.object().shape({
			date: Yup.string().required("Required"),
			time: Yup.string().required("Required"),
			address: Yup.string().required("Required"),
			status: Yup.string().required("Required"),
			description: Yup.string().required("Required"),
		})
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

const EditShipment = () => {
	const [activeStep, setActiveStep] = useState(0);

	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");

	const token = localStorage.getItem("token");
	const { me } = useSelector((state) => state.user);
	let { shipment } = useSelector((state) => state.shipment);
	const dispatch = useDispatch();

	const handleNext = useCallback(() => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	}, []);

	const handleBack = useCallback(() => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	}, []);

	const initialValues = {
		shipper: shipment && shipment.shipper ? JSON.parse(shipment.shipper) : {
			fullname: "",
			company: "",
			address: "",
			telephone: "",
			email: "",
		},

		cosignee: shipment && shipment.cosignee ? JSON.parse(shipment.cosignee) : {
			fullname: "",
			company: "",
			address: "",
			telephone: "",
			email: "",
		},

		collector: shipment && shipment.collector ? JSON.parse(shipment.collector) : {
			fullname: "",
			company: "",
			address: "",
			telephone: "",
			email: "",
		},

		departure: shipment && shipment.departure ? JSON.parse(shipment.departure) : {
			address: "",
			departure_date: "",
			departure_time: "",
			airport_code: "",
		},

		arrival: shipment && shipment.arrival ? JSON.parse(shipment.arrival) : {
			address: "",
			arrival_date: "",
			arrival_time: "",
			airport_code: "",
		},

		items: shipment.items,

		events: shipment.events,
	};

	const handleSubmit = async (values, actions) => {
		try {
			const response = await dispatch(editShipment(me._id, token, shipment._id, values));
			// extract success message
			const { success, message } = response;

			// Set the alert message from the response and determine severity
			setAlertMessage(message);
			setAlertSeverity(success ? "success" : "error");

			// close the modal
			if (success) {
				setTimeout(() => {
					// window.location.reload();
				}, 2000);
			}
		} catch (error) {
			setAlertMessage(error.error || "An error occurred.");
			setAlertSeverity("error");
		}

		actions.setSubmitting(false);
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
									<Button
										variant="contained"
										type="submit"
										disabled={isSubmitting}
										endIcon={<Iconify icon="mdi:check" />}
									>
										Submit
									</Button>
								) : (
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

export default EditShipment;
