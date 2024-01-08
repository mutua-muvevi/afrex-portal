import { Button, Stack } from "@mui/material";
import Iconify from "../../../../components/iconify";
import ShipmentTable from "./table";
import { useState } from "react";
import ModalComponent from "../../../../components/modal/modal";
import AddShipment from "../new/new";

const ShipmentMain = () => {
	const [ openAddShipment, setOpenAddShipment ] = useState(null)

	const handleAddShipment = () => {
		setOpenAddShipment(true)
	}

	return (
		<>
			<Stack direction="column" spacing={3}>
				<div>
					<Button
						variant="contained"
						color="primary"
						endIcon={<Iconify icon="mingcute:add-fill" />}
						onClick={handleAddShipment}
					>
						Add Shipment
					</Button>
				</div>

				<ShipmentTable/>
			</Stack>

			<ModalComponent
				open={openAddShipment}
				setOpen={setOpenAddShipment}
				title="Add Shipment"
				height="70vh"
				onClose={() => setOpenAddShipment(false)}
				maxWidth="xl"
			>
				<AddShipment onClose={() => setOpenAddShipment(false)} />
			</ModalComponent>
		</>
	);
};

export default ShipmentMain;
