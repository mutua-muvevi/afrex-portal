import { Stack } from "@mui/material";
import Textfield from "../../../../components/form/textfield/textfield";

const Others = () => {
	return (
		<Stack direction="column" spacing={3}>
			{/* others */}
			<Textfield label="Private Marks" name="privateMarks" />
			<Textfield label="Handling Charges" name="handlingCharges" />
			<Textfield label="Assured For" name="assuredFor" />
			<Textfield label="Receipt Number" name="receiptNumber" />
			<Textfield label="Valid Upto" name="receiptValidUpTo" />
			<Textfield label="Product Origin" name="productOrigin" />
			<Textfield label="Warehouse Location" name="wareHouseLocation" />
			<Textfield label="Received By" name="receivedBy" />
			<Textfield label="Deposit Date" name="depositDate" />
			<Textfield label="Deposit Time" name="depositTime" />
			<Textfield label="Track Number" name="track_number" />
		</Stack>
	);
};

export default Others;
