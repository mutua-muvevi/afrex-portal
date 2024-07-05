import { useState } from "react";

//mui
import { Alert, AlertTitle, Box, Grid, Grow, IconButton, InputAdornment, Stack } from "@mui/material";
import { styled } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/styles";

import { Form, Formik } from "formik";
import * as Yup from "yup";

//reusable fields
import Textfield from "../../components/form/textfield/textfield";
import SelectField from "../../components/form/select/select";

import { countries } from "../../constants/country";
import Iconify from "../../components/iconify";

//hooks
import { useAuthContext } from "../../auth/use-auth-context";

//redux
import { useDispatch } from '../../redux/store';
import { fetchMe } from "../../redux/slices/user";

const initialState = {
	fullname: "",
	email: "",
	country: "",
	password: "",
	confirm_password: "",
};

const registerSchema = Yup.object().shape({
	fullname: Yup.string().required("Fullname is required"),
	email: Yup.string().required("Email is required").email("Email is invalid"),
	country: Yup.string().required("Country is required"),
	password: Yup.string().required("Password is required"),
	confirm_password: Yup.string()
		.required("Confirm Password is required")
		.oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const StyledWrapper = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	width: "100%",
}));

const RegisterForm = () => {
	const { register } = useAuthContext();
	const dispatch = useDispatch();

	const [showPassword, setShowPassword] = useState(false);
	const theme = useTheme();

	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");

	const submitHandler = async (values, { resetForm, setErrors }) => {
		try {

			if (register){
				let response = await register(values.email, values.password, values.fullname, values.country);
				console.log("REsponse", response)
				setAlertMessage(response.data.message);
				setAlertSeverity("success");
				
			}

			const token = localStorage.getItem("token");
			
			//fetch user
			if (token){
				dispatch(fetchMe(token));
			}

		} catch (error) {
			console.log("Error", error);

			// Set form errors if the registration API provides error messages
			// This assumes error is an object with a structure like { email: "Email already exists" }
			if (error && error.errors) {
				setErrors(error.errors);
			}

			setAlertSeverity("error");
			setAlertMessage(error.error || "An error occurred");

			// Reset the form after a delay, if needed
			setTimeout(() => resetForm(), 5000);
		}
	};

	return (
		<StyledWrapper>
			<Stack direction="column" spacing={3}>
				{
					alertMessage && (
						<Grow in={true}>
							<Alert severity={alertSeverity}>
								<AlertTitle>{alertSeverity}</AlertTitle>
								{alertMessage}
							</Alert>
						</Grow>
					)
				}
				<Formik
					initialValues={initialState}
					validationSchema={registerSchema}
					onSubmit={submitHandler}
				>
					{({ isSubmitting }) => (
						<Form id="Registration Form">
							<Grid container spacing={3}>
								<Grid item xs={12} sm={12}>
									<Textfield
										fullWidth
										label="Full Name"
										name="fullname"
										type="text"
										variant="outlined"
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<Iconify icon="mingcute:user-4-fill" />
												</InputAdornment>
											),
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={12}>
									<Textfield
										fullWidth
										label="Email"
										name="email"
										type="email"
										variant="outlined"
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<Iconify icon="mdi:email" />
												</InputAdornment>
											),
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={12}>
									<SelectField
										fullWidth
										label="Country"
										name="country"
										type="text"
										variant="outlined"
										options={countries}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<Iconify icon="carbon:location-filled" />
												</InputAdornment>
											),
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={12}>
									<Textfield
										name="password"
										type={showPassword ? "text" : "password"}
										label="Password"
										fullWidth
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														onClick={() =>
															setShowPassword(
																!showPassword
															)
														}
														edge="end"
													>
														{showPassword ? (
															<Iconify icon="icomoon-free:eye" />
														) : (
															<Iconify icon="icomoon-free:eye-blocked" />
														)}
													</IconButton>
												</InputAdornment>
											),
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={12}>
									<Textfield
										name="confirm_password"
										type={showPassword ? "text" : "password"}
										label="Confirm Password"
										fullWidth
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														onClick={() =>
															setShowPassword(
																!showPassword
															)
														}
														edge="end"
													>
														{showPassword ? (
															<Iconify icon="icomoon-free:eye" />
														) : (
															<Iconify icon="icomoon-free:eye-blocked" />
														)}
													</IconButton>
												</InputAdornment>
											),
										}}
									/>
								</Grid>

								<Grid item xs={12} sm={12}>
									<LoadingButton
										fullWidth
										color="primary"
										size="large"
										type="submit"
										variant="contained"
										loading={isSubmitting}
										sx={{
											color: (theme) =>
												theme.palette.mode === "light"
													? "common.white"
													: "grey.800",
											"&:hover": {
												bgcolor:
													theme.palette.primary.darker,
												color: (theme) =>
													theme.palette.mode === "light"
														? "common.white"
														: "grey.800",
											},
										}}
									>
										Create account
									</LoadingButton>
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
			</Stack>
		</StyledWrapper>
	);
};

export default RegisterForm;
