import { Stack } from "@mui/material";
import Textfield from "../../../../components/form/textfield/textfield";
import TimeField from "../../../../components/form/date/time";
import DateField from "../../../../components/form/date/date";

const ShippingArrival = () => {
	return (
		<Stack direction="column" spacing={3}>
			<Textfield label="Address" name="arrival.address" />
			<Textfield label="Airport Code" name="arrival.airport_code" />
			<DateField label="Date" name="arrival.arrival_date" />
			<TimeField label="Time" name="arrival.arrival_time" />
		</Stack>
	);
};

export default ShippingArrival;
