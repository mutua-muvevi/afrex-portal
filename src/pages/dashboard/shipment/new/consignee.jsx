import { Stack } from "@mui/material";
import Textfield from "../../../../components/form/textfield/textfield";

const ShipmentCosignee = () => {
	return (
		<Stack direction="column" spacing={3}>
			<Textfield label="Fullname" name="consignee.fullname" />
			<Textfield label="Company" name="consignee.company" />
			<Textfield label="Address" name="consignee.address" />
			<Textfield label="Telephone" name="consignee.telephone" />
			<Textfield label="Email" name="consignee.email" />
		</Stack>
	)
}

export default ShipmentCosignee
