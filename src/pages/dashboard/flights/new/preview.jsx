import { Stack, Typography, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { fDate, fTime } from "../../../../utils/format-time";

const FlightPreview = ({ values }) => {
	const theme = useTheme();
	const styledStack = {
		backgroundColor: theme.palette.background.default,
		p: 2,
	};

	return (
		<Stack direction="column" spacing={3}>
			<Stack direction="column" spacing={1} sx={styledStack}>
				<Typography variant="h6" color="primary">
					Airplane Detail
				</Typography>

				<Typography variant="body1">
					{values.airplane.airline}
				</Typography>

				<Typography variant="body1">
					{values.airplane.aircraft}
				</Typography>

				<Typography variant="body1">{values.airplane.regNo}</Typography>

				<Typography variant="body1">
					Booking Ref Number {values.ref_number}
				</Typography>
			</Stack>

			<Stack direction="column" spacing={1} sx={styledStack}>
				<Typography variant="h6" color="primary">
					Flight Departure Period
				</Typography>

				<Typography variant="body1">
					{values.departureTime.date
						? fDate(values.departureTime.date)
						: "Not set"}
				</Typography>

				<Typography variant="body1">
					{values.departureTime.time
						? fTime(values.departureTime.time)
						: "Not set"}
				</Typography>

				<Typography variant="body1">
					{values.departureTime.timezone}
				</Typography>
			</Stack>

			<Stack direction="column" spacing={1} sx={styledStack}>
				<Typography variant="h6" color="primary">
					Flight Arrival Period
				</Typography>

				<Typography variant="body1">
					{values.arrivalTime.date
						? fDate(values.arrivalTime.date)
						: "Not set"}
				</Typography>

				<Typography variant="body1">
					{values.arrivalTime.time
						? fTime(values.arrivalTime.time)
						: "Not set"}
				</Typography>

				<Typography variant="body1">
					{values.arrivalTime.timezone}
				</Typography>
			</Stack>

			<Stack direction="column" spacing={1} sx={styledStack}>
				<Typography variant="h6" color="primary">
					Flight Status
				</Typography>

				<Typography variant="body1">{values.status.title}</Typography>

				<Typography variant="body1">
					{values.status.description}
				</Typography>
			</Stack>

			<Stack direction="column" spacing={1} sx={styledStack}>
				<Typography variant="h6" color="primary">
					Origin Airport
				</Typography>

				<Typography variant="body1">
					{values.originAirport.name}
				</Typography>

				<Typography variant="body1">
					{values.originAirport.city}
				</Typography>

				<Typography variant="body1">
					{values.originAirport.country}
				</Typography>
			</Stack>

			<Stack direction="column" spacing={1} sx={styledStack}>
				<Typography variant="h6" color="primary">
					Destination Airport
				</Typography>

				<Typography variant="body1">
					{values.destinationAirport.name}
				</Typography>

				<Typography variant="body1">
					{values.destinationAirport.city}
				</Typography>

				<Typography variant="body1">
					{values.destinationAirport.country}
				</Typography>
			</Stack>
		</Stack>
	);
};

FlightPreview.propTypes = {
	values: PropTypes.object.isRequired,
};

export default FlightPreview;
