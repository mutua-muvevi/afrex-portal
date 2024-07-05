import { Stack } from "@mui/material";
import Textfield from "../../../../components/form/textfield/textfield";

const Owner = () => {
	return (
		<Stack direction="column" spacing={3}>
			<Textfield label="Fullname" name="owner.fullname" />
			<Textfield label="Company" name="owner.company" />
			<Textfield label="Address" name="owner.address" />
			<Textfield label="Telephone" name="owner.telephone" />
			<Textfield label="Email" name="owner.email" />
			<Textfield label="Identification Number" name="owner.identificationNo" />
			<Textfield label="Account Number" name="owner.accountNo" />
		</Stack>
	);
};

export default Owner;