import { Stack } from "@mui/material";
import Textfield from "../../../../components/form/textfield/textfield";
import DateField from "../../../../components/form/date/date";
import TimeField from "../../../../components/form/date/time";

const Others = () => {
	return (
		<Stack direction="column" spacing={3}>
			{/* others */}
			<Textfield label="Track Number" name="track_number" />
			<Textfield label="Private Marks" name="privateMarks" />
			<Textfield label="Handling Charges" name="handlingCharges" />
			<Textfield label="Assured For" name="assuredFor" />
			<Textfield label="Receipt Number" name="receiptNumber" />
			<Textfield label="Valid Upto" name="receiptValidUpTo" />
			<Textfield label="Product Origin" name="productOrigin" />
			<Textfield label="Warehouse Location" name="wareHouseLocation" />
			<Textfield label="Received By" name="receivedBy" />
			<DateField label="Deposit Date" name="depositDate" />
			<TimeField label="Deposit Time" name="depositTime" />
		</Stack>
	);
};

export default Others;
