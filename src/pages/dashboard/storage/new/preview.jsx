import { Stack, Typography, useTheme } from "@mui/material";
import PropTypes from "prop-types";

const Preview = ({ values }) => {
	const theme = useTheme();
	const styledStack = {
		backgroundColor: theme.palette.background.default,
		p: 2,
	};
	return (
		<Stack direction="column" spacing={3}>
			<Stack direction="column" spacing={1} sx={styledStack}>
				<Typography variant="h6" color="primary">
					Depositor's Detail
				</Typography>

				<Typography variant="body1">
					{values.depositor.fullname}
				</Typography>

				<Typography variant="body1">
					{values.depositor.company}
				</Typography>

				<Typography variant="body1">
					{values.depositor.address}
				</Typography>

				<Typography variant="body1">
					{values.depositor.telephone}
				</Typography>

				<Typography variant="body1">
					{values.depositor.email}
				</Typography>
			</Stack>

			<Stack direction="column" spacing={1} sx={styledStack}>
				<Typography variant="h6" color="primary">
					Owner's Detail
				</Typography>

				<Typography variant="body1">{values.owner.fullname}</Typography>

				<Typography variant="body1">{values.owner.company}</Typography>

				<Typography variant="body1">{values.owner.address}</Typography>

				<Typography variant="body1">
					{values.owner.telephone}
				</Typography>

				<Typography variant="body1">{values.owner.email}</Typography>
			</Stack>

			<Stack direction="column" spacing={1} sx={styledStack}>
				<Typography variant="h6" color="primary">
					Acceptance
				</Typography>

				<Typography variant="body1">
					From: {values.acceptance.from.date}{" "}
					{values.acceptance.from.time}
				</Typography>

				<Typography variant="body1">
					To: {values.acceptance.to.date} {values.acceptance.to.time}
				</Typography>
			</Stack>

			{values.productDetails.map((product, index) => (
				<Stack
					direction="column"
					spacing={1}
					sx={styledStack}
					key={index}
				>
					<Typography variant="h6" color="primary">
						Product Details
					</Typography>

					<Typography variant="body1">
						HS Code: {product.HSCode}
					</Typography>

					<Typography variant="body1">
						Packages No: {product.packagesNo}
					</Typography>

					<Typography variant="body1">
						Net Quantity: {product.netQuantity}
					</Typography>

					<Typography variant="body1">
						Market Rate: {product.marketRate}
					</Typography>

					<Typography variant="body1">
						Total Market Value: {product.totalMarketValue}
					</Typography>

					<Typography variant="body1">
						Description: {product.description}
					</Typography>
				</Stack>
			))}

			<Stack direction="column" spacing={1} sx={styledStack}>
				<Typography variant="h6" color="primary">
					Private Marks
				</Typography>

				<Typography variant="body1">{values.privateMarks}</Typography>
			</Stack>

			<Stack direction="column" spacing={1} sx={styledStack}>
				<Typography variant="h6" color="primary">
					Handling Charges
				</Typography>

				<Typography variant="body1">
					{values.handlingCharges}
				</Typography>
			</Stack>

			<Stack direction="column" spacing={1} sx={styledStack}>
				<Typography variant="h6" color="primary">
					Assured For
				</Typography>

				<Typography variant="body1">{values.assuredFor}</Typography>
			</Stack>

			<Stack direction="column" spacing={1} sx={styledStack}>
				<Typography variant="h6" color="primary">
					Receipt Number
				</Typography>

				<Typography variant="body1">{values.receiptNumber}</Typography>
			</Stack>

			<Stack direction="column" spacing={1} sx={styledStack}>
				<Typography variant="h6" color="primary">
					Valid Upto
				</Typography>

				<Typography variant="body1">
					{values.receiptValidUpTo}
				</Typography>
			</Stack>

			<Stack direction="column" spacing={1} sx={styledStack}>
				<Typography variant="h6" color="primary">
					Product Origin
				</Typography>

				<Typography variant="body1">{values.productOrigin}</Typography>
			</Stack>

			<Stack direction="column" spacing={1} sx={styledStack}>
				<Typography variant="h6" color="primary">
					Warehouse Location
				</Typography>

				<Typography variant="body1">
					{values.wareHouseLocation}
				</Typography>
			</Stack>

			<Stack direction="column" spacing={1} sx={styledStack}>
				<Typography variant="h6" color="primary">
					Received By
				</Typography>

				<Typography variant="body1">{values.receivedBy}</Typography>
			</Stack>

			<Stack direction="column" spacing={1} sx={styledStack}>
				<Typography variant="h6" color="primary">
					Deposit Date
				</Typography>

				<Typography variant="body1">{values.depositDate}</Typography>
			</Stack>

			<Stack direction="column" spacing={1} sx={styledStack}>
				<Typography variant="h6" color="primary">
					Deposit Time
				</Typography>

				<Typography variant="body1">{values.depositTime}</Typography>
			</Stack>

			<Stack direction="column" spacing={1} sx={styledStack}>
				<Typography variant="h6" color="primary">
					Track Number
				</Typography>

				<Typography variant="body1">{values.track_number}</Typography>
			</Stack>
		</Stack>
	);
};

Preview.propTypes = {
	values: PropTypes.object.isRequired,
};

export default Preview;
