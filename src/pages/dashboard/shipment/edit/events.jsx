import PropTypes from "prop-types";
import { FieldArray } from "formik";
import { Button, Stack, useTheme } from "@mui/material";
import Textfield from "../../../../components/form/textfield/textfield";
import DateField from "../../../../components/form/date/date";
import TimeField from "../../../../components/form/date/time";
import SelectField from "../../../../components/form/select/select";

const statusSelectField = [
	{
		name: "ongoing",
		label: "Ongoing"
	},
	{
		name: "completed",
		label: "Completed"
	},
	{
		name: "pending",
		label: "Pending"
	},
	{
		name: "cancelled",
		label: "Cancelled"
	},
	{
		name: "delayed",
		label: "Delayed"
	},
	{
		name: "other",
		label: "Other"
	}
]

const ShippingEvents = ({ values }) => {
	const theme = useTheme();
	return (
		<FieldArray name="events">
			{({ push, remove }) => (
				<>
					{values.events.map((item, index) => (
						<Stack
							key={index}
							direction="column"
							spacing={3}
							sx={{
								py: 3,
								borderBottom: `1px dashed ${theme.palette.text.primary}`,
							}}
						>
							
							<DateField
								name={`events.${index}.date`}
								label="Date"
							/>

							<TimeField
								name={`events.${index}.time`}
								label="Time"
							/>

							<Textfield
								label="address"
								name={`events.${index}.address`}
							/>

							<SelectField
								label="status"
								name={`events.${index}.status`}
								options={statusSelectField}
							/>

							<Textfield
								label="description"
								name={`events.${index}.description`}
								multiline
								rows={4}
							/>

							{values.events.length > 0 && (
								<Button
									type="button"
									variant="outlined"
									onClick={() => remove(index)}
								>
									Remove the above event block
								</Button>
							)}
						</Stack>
					))}
					<Button
						variant="contained"
						color="primary"
						onClick={() => push({})}
						sx={{mt: 3}}
					>
						Add another event
					</Button>
				</>
			)}
		</FieldArray>
	);
};

ShippingEvents.propTypes = {
	values: PropTypes.object.isRequired,
};

export default ShippingEvents;
