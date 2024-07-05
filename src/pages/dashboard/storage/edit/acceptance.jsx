import DateField from "../../../../components/form/date/date";
import TimeField from "../../../../components/form/date/time";

import { Stack } from "@mui/material";
const Acceptance = () => {
	return (
		<Stack direction="column" spacing={3}>
			{/* //acceptance */}
			<DateField label="Accepted from Date" name="acceptance.from.date" />
			<TimeField label="Accepted from Time" name="acceptance.from.time" />
		</Stack>
	);
};

export default Acceptance;
