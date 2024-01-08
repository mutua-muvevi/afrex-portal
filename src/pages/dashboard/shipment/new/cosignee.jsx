import { Stack } from "@mui/material";
import Textfield from "../../../../components/form/textfield/textfield";

const ShipmentCosignee = () => {
	return (
		<Stack direction="column" spacing={3}>
			<Textfield label="Fullname" name="cosignee.fullname" />
			<Textfield label="Company" name="cosignee.company" />
			<Textfield label="Address" name="cosignee.address" />
			<Textfield label="Telephone" name="cosignee.telephone" />
			<Textfield label="Email" name="cosignee.email" />
		</Stack>
	)
}

export default ShipmentCosignee
