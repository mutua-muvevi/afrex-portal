import { Stack } from "@mui/material";
import Textfield from "../../../../components/form/textfield/textfield";
import SelectField from "../../../../components/form/select/select";
import { countries } from "../../../../constants/country";

const FlightDestination = () => {
	return (
		<Stack direction="column" spacing={3}>
			<Textfield
				label="Airport Name"
				name="destinationAirport.name"
			/>
			<Textfield label="City" name="destinationAirport.city" />
			<SelectField
				label="Country"
				name="destinationAirport.country"
				options={countries}
			/>
		</Stack>
	);
};

export default FlightDestination;
