import { Stack } from "@mui/material";
import Textfield from "../../../../components/form/textfield/textfield";

const FlightStatus = () => {
	return (
		<Stack direction="column" spacing={3}>
			<Textfield
				label="Status Title"
				name="status.title"
			/>
			<Textfield
				label="Status Description"
				name="status.description"
				multiline
				rows={4}
			/>
		</Stack>
	)
  }
  
  export default FlightStatus