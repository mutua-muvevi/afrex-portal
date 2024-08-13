import { Stack } from "@mui/material";
import DateField from "../../../../components/form/date/date";
import TimeField from "../../../../components/form/date/time";
import Textfield from "../../../../components/form/textfield/textfield";

const FlightArrival = () => {
	return (
		<Stack direction="column" spacing={3}>
			<DateField
				label="Date of arrival"
				name="arrivalTime.date"
				size="small"
			/>
			<TimeField
				label="Time of arrival"
				name="arrivalTime.time"
				size="small"
			/>
			<Textfield
				label="Timezone"
				name="arrivalTime.timezone"
				placeholder="eg Nairobi Timezone"
			/>
		</Stack>
	);
};

export default FlightArrival;
