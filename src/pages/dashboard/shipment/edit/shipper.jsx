import { Stack } from "@mui/material";
import Textfield from "../../../../components/form/textfield/textfield";

const ShipmentShippers = () => {
	return (
		<Stack direction="column" spacing={3}>
			<Textfield label="Fullname" name="shipper.fullname" />
			<Textfield label="Company" name="shipper.company" />
			<Textfield label="Address" name="shipper.address" />
			<Textfield label="Telephone" name="shipper.telephone" />
			<Textfield label="Email" name="shipper.email" />
		</Stack>
	);
};

export default ShipmentShippers;
