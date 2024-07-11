import { Button, Stack, useTheme } from "@mui/material";
import Textfield from "../../../../components/form/textfield/textfield";
import { FieldArray } from "formik";
import PropTypes from "prop-types";

const ProductDetail = ({ values }) => {
	const theme = useTheme();
	return (
		<Stack direction="column" spacing={3}>
			<FieldArray name="productDetails">
				{({ push, remove }) => (
					<div>{console.log("Values", values.productDetails)}
						{values.productDetails.map((_, index) => (
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
									label="HS Code"
									name={`productDetails.${index}.HSCode`}
								/>
								<Textfield
									label="Packages No"
									name={`productDetails.${index}.packagesNo`}
								/>
								<Textfield
									label="Net Quantity"
									name={`productDetails.${index}.netQuantity`}
								/>
								<Textfield
									label="Market Rate"
									name={`productDetails.${index}.marketRate`}
								/>
								<Textfield
									label="Total Market Value"
									name={`productDetails.${index}.totalMarketValue`}
								/>
								<Textfield
									label="Description"
									name={`productDetails.${index}.description`}
									multiline
									rows={4}
								/>
								{values.productDetails.length > 1 && (
									<Button
										type="button"
										variant="outlined"
										onClick={() => remove(index)}
									>
										Remove the above product item
									</Button>
								)}
							</Stack>
						))}

						<Button
							type="button"
							variant="contained"
							sx={{ mt: 3 }}
							onClick={() =>
								push({
									HSCode: "",
									packagesNo: "",
									netQuantity: "",
									marketRate: "",
									totalMarketValue: "",
									description: "",
								})
							}
						>
							Add Product
						</Button>
					</div>
				)}
			</FieldArray>
		</Stack>
	);
};

ProductDetail.propTypes = {
	values: PropTypes.object.isRequired,
};

export default ProductDetail;
