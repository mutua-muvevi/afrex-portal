import {
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
	DialogActions,
	Button,
	useTheme,
	IconButton,
	ButtonGroup,
	Stack,
} from "@mui/material";
import PropTypes from "prop-types";
import Iconify from "../iconify";
import Scrollbar from "../scrollbar";
import { sentenceCase } from "change-case";
import TableComponent from "../table/table";
import { fDateAlt } from "../../utils/format-time";

const ModalComponent = ({ selectedRow, open, onClose, title, actions }) => {
	const theme = useTheme();

	const isDatetimeString = (value) => {
		const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/;
		return regex.test(value);
	};

	// Function to render table for array values
	const renderArrayTable = (array) => {
		const columns = array.length > 0 ? Object.keys(array[0]) : [];

		// Modify the array to apply fDateAlt() to the date field if it exists
		const formattedArray = array.map((row) => {
			if (row.date) {
				// Apply fDateAlt() to format the date field
				return { ...row, date: fDateAlt(row.date) };
			}
			return row;
		});

		return <TableComponent columns={columns} array={formattedArray} />;
	};

	return (
		<Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
			<DialogTitle
				sx={{
					backgroundColor: theme.palette.primary.main,
					paddingTop: 2,
					paddingBottom: 2,
				}}
			>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Typography
						variant="sibtitle1"
						sx={{ color: theme.palette.primary.contrastText }}
					>
						{title ? title : "Row Details"}
					</Typography>
					<IconButton onClick={onClose}>
						<Iconify
							icon="mdi:close"
							sx={{ color: theme.palette.primary.contrastText }}
						/>
					</IconButton>
				</Stack>
			</DialogTitle>

			<DialogContent sx={{ marginTop: 3 }}>
				<Scrollbar sx={{ height: 500 }}>
					<Stack direction="column" spacing={3}>
						{selectedRow &&
							Object.entries(selectedRow).map(([key, value]) => (
								<Stack
									key={key}
									direction="column"
									spacing={1.5}
								>
									<Typography
										variant="h6"
										sx={{
											color: theme.palette.primary.main,
											marginBottom: { xs: 1, lg: 0 },
										}}
									>
										{key ? sentenceCase(key) : "No data"}
									</Typography>
									{Array.isArray(value) ? (
										renderArrayTable(value)
									) : typeof value === "object" ? (
										Object.entries(value).map(
											([nestedKey, nestedValue]) => (
												<Stack
													key={nestedKey}
													direction="row"
													spacing={3}
												>
													<Typography
														variant="subtitle2"
														sx={{
															color: theme.palette
																.primary.main,
															marginBottom: {
																xs: 1,
																lg: 0,
															},
														}}
													>
														{nestedKey
															? sentenceCase(
																nestedKey
															)
															: "No data"}
													</Typography>
													<Typography variant="subtitle2">
														{typeof nestedValue === "object"
															? Object.values(nestedValue)
																.map((val) => (val === "" ? "____" : val))
																.join(",   ")
															: nestedValue.toString()}
														{console.log("Nested dta here", nestedValue)}
													</Typography>

												</Stack>
											)
										)
									) : (
										<Typography variant="subtitle1">
											{typeof value === "string" &&
											isDatetimeString(value)
												? fDateAlt(value)
												: value}
										</Typography>
									)}
								</Stack>
							))}
					</Stack>
				</Scrollbar>
			</DialogContent>

			<DialogActions>
				<ButtonGroup variant="contained">
					<Button
						onClick={onClose}
						endIcon={<Iconify icon="mdi:close" />}
					>
						Close
					</Button>
					{actions &&
						actions.map((action, index) => (
							<Button
								key={index}
								onClick={() => action.onClick(selectedRow)}
								endIcon={<Iconify icon={action.icon} />}
								color={action.color ? action.color : "primary"}
							>
								{action.label}
							</Button>
						))}
				</ButtonGroup>
			</DialogActions>
		</Dialog>
	);
};

ModalComponent.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	selectedRow: PropTypes.object,
	title: PropTypes.string,
	actions: PropTypes.array,
};

export default ModalComponent;
