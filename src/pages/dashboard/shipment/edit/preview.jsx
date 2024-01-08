import { Stack, Typography, useTheme } from "@mui/material";
import PropTypes from "prop-types";

const ShipmentPreview = ({ values }) => {
	const theme = useTheme();
	const styledStack = {
		backgroundColor: theme.palette.background.default,
		p:2
	};
	return (
		<Stack direction="column" spacing={3}>
			<Stack direction="column" spacing={1} sx={styledStack}>
				<Typography variant="h6"color="primary">Shipper's Detail</Typography>

				<Typography variant="body1">
					{values.shipper.fullname}
				</Typography>

				<Typography variant="body1">
					{values.shipper.company}
				</Typography>

				<Typography variant="body1">
					{values.shipper.address}
				</Typography>

				<Typography variant="body1">
					{values.shipper.telephone}
				</Typography>

				<Typography variant="body1">{values.shipper.email}</Typography>
			</Stack>

			<Stack direction="column" spacing={1} sx={styledStack}>
				<Typography variant="h6"color="primary">Consignee's Detail</Typography>

				<Typography variant="body1">
					{values.cosignee.fullname}
				</Typography>

				<Typography variant="body1">
					{values.cosignee.company}
				</Typography>

				<Typography variant="body1">
					{values.cosignee.address}
				</Typography>

				<Typography variant="body1">
					{values.cosignee.telephone}
				</Typography>

				<Typography variant="body1">
					{values.cosignee.email}
				</Typography>
			</Stack>

			<Stack direction="column" spacing={1} sx={styledStack}>
				<Typography variant="h6"color="primary">Collector's Detail</Typography>

				<Typography variant="body1">
					{values.collector.fullname}
				</Typography>

				<Typography variant="body1">
					{values.collector.company}
				</Typography>

				<Typography variant="body1">
					{values.collector.address}
				</Typography>

				<Typography variant="body1">
					{values.collector.telephone}
				</Typography>

				<Typography variant="body1">
					{values.collector.email}
				</Typography>
			</Stack>

			<Stack direction="column" spacing={1} sx={styledStack}>
				<Typography variant="h6"color="primary">Departure</Typography>

				<Typography variant="body1">
					{values.departure.address}
				</Typography>

				<Typography variant="body1">
					{values.departure.airport_code}
				</Typography>

				<Typography variant="body1">
					{values.departure.departure_date}
				</Typography>

				<Typography variant="body1">
					{values.departure.departure_time}
				</Typography>
			</Stack>

			<Stack direction="column" spacing={1} sx={styledStack}>
				<Typography variant="h6"color="primary"> Arrival/Destination </Typography>

				<Typography variant="body1">
					{values.arrival.address}
				</Typography>

				<Typography variant="body1">
					{values.arrival.airport_code}
				</Typography>

				<Typography variant="body1">
					{values.arrival.arrival_date}
				</Typography>

				<Typography variant="body1">
					{values.arrival.arrival_time}
				</Typography>
			</Stack>

			{values.items.map((item, index) => (
				<Stack
					key={index}
					direction="column"
					spacing={1}
					sx={styledStack}
				>
					<Typography variant="h6"color="primary">Item {index + 1}</Typography>

					<Typography variant="body1">{item.description}</Typography>

					<Typography variant="body1">{item.unit}</Typography>

					<Typography variant="body1">{item.weight}</Typography>

					<Typography variant="body1">{item.amount}</Typography>
				</Stack>
			))}

			{values.events.map((item, index) => (
				<Stack
					key={index}
					direction="column"
					spacing={1}
					sx={styledStack}
				>
					<Typography variant="h6"color="primary">Event {index + 1}</Typography>

					<Typography variant="body1">{item.date}</Typography>

					<Typography variant="body1">{item.time}</Typography>

					<Typography variant="body1">{item.address}</Typography>

					<Typography variant="body1">{item.status}</Typography>

					<Typography variant="body1">{item.description}</Typography>
				</Stack>
			))}

			<Stack direction="row" spacing={1} sx={styledStack}>
				<Typography variant="h6"color="primary">Track Number</Typography>

				<Typography variant="body1">{values.track_number}</Typography>
			</Stack>
		</Stack>
	);
};

ShipmentPreview.propTypes = {
	values: PropTypes.object.isRequired,
};

export default ShipmentPreview;
