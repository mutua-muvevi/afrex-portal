import PropTypes from "prop-types";
import { FieldArray } from "formik";
import { Button, Stack, useTheme } from "@mui/material";
import Textfield from "../../../../components/form/textfield/textfield";

const ShippingItems = ({ values }) => {
	const theme = useTheme();
	return (
		<FieldArray name="items">
			{({ push, remove }) => (
				<>
					{values.items.map((item, index) => (
						<Stack
							key={index}
							direction="column"
							spacing={3}
							sx={{
								py: 3,
								borderBottom: `1px dashed ${theme.palette.text.primary}`,
							}}
						>
							<Textfield
								label="Unit of measurement"
								name={`items.${index}.unit`}
								placeholder="2 litres of ..."
							/>
							<Textfield
								label="Weight"
								name={`items.${index}.weight`}
								placeholder="12 Tonnes"
							/>
							<Textfield
								label="Pieces"
								name={`items.${index}.amount`}
								type="number"
							/>
							<Textfield
								label="Description"
								name={`items.${index}.description`}
								multiline
								rows={4}
							/>
							{values.items.length > 1 && (
								<Button
									type="button"
									variant="outlined"
									onClick={() => remove(index)}
								>
									Remove the above item block
								</Button>
							)}
						</Stack>
					))}
					<Button
						variant="contained"
						color="primary"
						onClick={() => push({})}
					>
						Add item
					</Button>
				</>
			)}
		</FieldArray>
	);
};

ShippingItems.propTypes = {
	values: PropTypes.object.isRequired,
};

export default ShippingItems;
