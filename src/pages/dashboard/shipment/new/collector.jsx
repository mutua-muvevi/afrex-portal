import { Stack } from "@mui/material";
import Textfield from "../../../../components/form/textfield/textfield";

const ShipmentCollector = () => {
	return (
		<Stack direction="column" spacing={3}>
			<Textfield label="Fullname" name="collector.fullname" />
			<Textfield label="Company" name="collector.company" />
			<Textfield label="Address" name="collector.address" />
			<Textfield label="Telephone" name="collector.telephone" />
			<Textfield label="Email" name="collector.email" />
		</Stack>
	)
}

export default ShipmentCollector
