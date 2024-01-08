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

			{/* //acceptance */}
			<Textfield label="From Date" name="acceptance.from.date" />
			<Textfield label="From Time" name="acceptance.from.time" />
			<Textfield label="To Date" name="acceptance.to.date" />
			<Textfield label="To Time" name="acceptance.to.time" />
		</Stack>
	);
};

export default Owner;