import { Stack } from "@mui/material";
import Textfield from "../../../../components/form/textfield/textfield";

const FlightAirplane = () => {
  return (
	<Stack direction="column" spacing={3}>
		<Textfield label="Airline" name="airplane.airline" />
		<Textfield label="Aircraft" name="airplane.aircraft" />
		<Textfield label="Registration Number" name="airplane.regNo" />
	</Stack>
  )
}

export default FlightAirplane
