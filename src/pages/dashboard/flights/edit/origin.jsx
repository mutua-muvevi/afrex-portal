import { Stack } from "@mui/material";
import Textfield from "../../../../components/form/textfield/textfield";
import SelectField from "../../../../components/form/select/select";
import { countries } from "../../../../constants/country";

const FlightOrigin = () => {
	return (
		<Stack direction="column" spacing={3}>
			<Textfield
				label="Airport Name"
				name="originAirport.name"
			/>
			<Textfield label="City" name="originAirport.city" />
			<SelectField
				label="Country"
				name="originAirport.country"
				options={countries}
			/>
		</Stack>
	);
};

export default FlightOrigin;
