import { Stack } from "@mui/material";
import Textfield from "../../../../components/form/textfield/textfield";

const Depositor = () => {
	return (
		<Stack direction="column" spacing={3}>
			<Textfield label="Fullname" name="depositor.fullname" />
			<Textfield label="Company" name="depositor.company" />
			<Textfield label="Address" name="depositor.address" />
			<Textfield label="Telephone" name="depositor.telephone" />
			<Textfield label="Email" name="depositor.email" />
		</Stack>
	);
};

export default Depositor;