import { Stack } from "@mui/material";
import Textfield from "../../../../components/form/textfield/textfield";
import TimeField from "../../../../components/form/date/time";
import DateField from "../../../../components/form/date/date";

const ShippingDeparture = () => {
	return (
		<Stack direction="column" spacing={3}>
			<Textfield label="Address" name="departure.address" />
			<Textfield label="Airport Code" name="departure.airport_code" />
			<DateField label="Date" name="departure.departure_date" />
			<TimeField label="Time" name="departure.departure_time" />
		</Stack>
	);
};

export default ShippingDeparture;
