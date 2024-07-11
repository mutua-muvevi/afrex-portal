import PropTypes from "prop-types";
import { FieldArray } from "formik";
import { Button, Stack, useTheme } from "@mui/material";
import Textfield from "../../../../components/form/textfield/textfield";

const ShippingItems = ({ values }) => {
	const theme = useTheme();
	return (
		<Stack  direction="column" spacing={3}>
			{console.log(values)}
			<Textfield
				name="track_number"
				label="Track Number"
				value={values.track_number}
				disabled
			/>
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
								{values.items.length > 0 && (
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
							sx={{mb: 3}}
						>
							Add item
						</Button>
					</>
				)}
			</FieldArray>
		</Stack>
	);
};

ShippingItems.propTypes = {
	values: PropTypes.object.isRequired,
};

export default ShippingItems;
