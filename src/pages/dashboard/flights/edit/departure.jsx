import { Stack } from "@mui/material";
import DateField from "../../../../components/form/date/date";
import TimeField from "../../../../components/form/date/time";
import Textfield from "../../../../components/form/textfield/textfield";
import Iconify from "../../../../components/iconify/Iconify";

const FlightDeparture = () => {
	return (
		<Stack direction="column" spacing={3}>
			<DateField
				label="Date of departure"
				name="departureTime.date"
				size="small"
			/>
			<TimeField
				label="Time of departure"
				name="departureTime.time"
				size="small"
			/>
			<Textfield
				label="Timezone"
				name="departureTime.timezone"
				size="medium"
				InputProps={{
					endAdornment: (
						<Iconify icon="subway:world-1" />
					),
				}}
			/>
		</Stack>
	);
};

export default FlightDeparture;
