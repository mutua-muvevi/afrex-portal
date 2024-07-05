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

import Depositor from "./depositor";
import Acceptance from "./acceptance";
import Others from "./others";
import ProductDetail from "./product";
import Owner from "./owner";

import Iconify from "../../../../components/iconify";
import { editStorage } from "../../../../redux/slices/storage";
import { useDispatch, useSelector } from "../../../../redux/store";
import Preview from "./preview";

const validationSchema = Yup.object().shape({
	depositor: Yup.object().shape({
		fullname: Yup.string().required("Required"),
		company: Yup.string().required("Required"),
		address: Yup.string().required("Required"),
		telephone: Yup.string().required("Required"),
		email: Yup.string().email("Invalid email").required("Required"),
	}),
	owner: Yup.object().shape({
		fullname: Yup.string().required("Required"),
		company: Yup.string().required("Required"),
		address: Yup.string().required("Required"),
		telephone: Yup.string().required("Required"),
		email: Yup.string().email("Invalid email").required("Required"),
		identificationNo: Yup.string().required("Required"),
		accountNo: Yup.string().required("Required"),
	}),
	productDetails: Yup.array().of(
		Yup.object().shape({
			HSCode: Yup.string().required("Required"),
			packagesNo: Yup.string().required("Required"),
			netQuantity: Yup.string().required("Required"),
			marketRate: Yup.string().required("Required"),
			totalMarketValue: Yup.string().required("Required"),
			description: Yup.string().required("Required"),
		})
	),

	acceptance: Yup.object().shape({
		from: Yup.object().shape({
			date: Yup.string().required("Required"),
			time: Yup.string().required("Required"),
		}),
		// to: Yup.object().shape({
		// 	date: Yup.string().required("Required"),
		// 	time: Yup.string().required("Required"),
		// }),
	}),

	privateMarks: Yup.string().required("Required"),
	handlingCharges: Yup.string().required("Required"),
	assuredFor: Yup.string().required("Required"),
	receiptNumber: Yup.string().required("Required"),
	receiptValidUpTo: Yup.string().required("Required"),
	productOrigin: Yup.string().required("Required"),
	wareHouseLocation: Yup.string().required("Required"),
	receivedBy: Yup.string().required("Required"),
	depositDate: Yup.string().required("Required"),
	depositTime: Yup.string().required("Required"),
	track_number: Yup.string().required("Required"),
});

const steps = [
	"Depositor",
	"Owner",
	"Product Detail",
	"Acceptance",
	"Others",
	"Preview",
];

const EditStorage = () => {
	const [activeStep, setActiveStep] = useState(0);

	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");

	const token = localStorage.getItem("token");
	const { me } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const { storage } = useSelector((state) => state.storage);

	const handleNext = useCallback(() => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	}, []);

	const handleBack = useCallback(() => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	}, []);

	const initialValues = {
		depositor: storage && storage.depositor ? storage.depositor : {
			fullname: "",
			company: "",
			address: "",
			telephone: "",
			email: "",
		},
		owner: storage && storage.owner ? storage.owner : {
			fullname: "",
			company: "",
			address: "",
			telephone: "",
			email: "",
			identificationNo: "",
			accountNo: "",
		},
		productDetails: storage && storage.productDetails ? storage.productDetails : [{
			HSCode: "",
			packagesNo: "",
			netQuantity: "",
			marketRate: "",
			totalMarketValue: "",
			description: "",
		}],
		acceptance: storage && storage.acceptance ? storage.acceptance : {
			from: {
				date: "",
				time: "",
			},
			// to: {
			// 	date: "",
			// 	time: "",
			// },
		},
		privateMarks: storage && storage.privateMarks ? storage.privateMarks : "",
		handlingCharges: storage && storage.handlingCharges ? storage.handlingCharges : "",
		assuredFor: storage && storage.assuredFor ? storage.assuredFor : "",
		receiptNumber: storage && storage.receiptNumber ? storage.receiptNumber : "",
		receiptValidUpTo: storage && storage.receiptValidUpTo ? storage.receiptValidUpTo : "",
		productOrigin: storage && storage.productOrigin ? storage.productOrigin : "",
		wareHouseLocation: storage && storage.wareHouseLocation ? storage.wareHouseLocation : "",
		receivedBy: storage && storage.receivedBy ? storage.receivedBy : "",
		depositDate: storage && storage.depositDate ? storage.depositDate : "",
		depositTime: storage && storage.depositTime ? storage.depositTime : "",
		track_number: storage && storage.track_number ? storage.track_number : "",
		
	};

	const handleSubmit = async (values, actions) => {
		try {
			const response = await dispatch(editStorage(me._id, token,  storage._id, values));
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
								<Depositor
									values={values}
									setFieldValue={setFieldValue}
								/>
							)}

							{activeStep === 1 && (
								<Owner
									values={values}
									setFieldValue={setFieldValue}
								/>
							)}

							{activeStep === 2 && (
								<ProductDetail
									values={values}
									setFieldValue={setFieldValue}
								/>
							)}

							{activeStep === 3 && (
								<Acceptance
									values={values}
									setFieldValue={setFieldValue}
								/>
							)}

							{activeStep === 4 && (
								<Others
									values={values}
									setFieldValue={setFieldValue}
								/>
							)}

							{activeStep === 5 && (
								<Preview
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

export default EditStorage;
