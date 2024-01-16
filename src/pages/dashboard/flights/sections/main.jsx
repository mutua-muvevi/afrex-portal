import { Button, Stack } from "@mui/material";
import Iconify from "../../../../components/iconify";
import FlightsTable from "./table";
import { useState } from "react";
import ModalComponent from "../../../../components/modal/modal";
import NewFlight from "../new/new";

const FlightsMain = () => {
	const [ openAddFlight, setOpenAddFlight ] = useState(null)


	return (
		<>
			<Stack direction="column" spacing={3}>
				<div>
					<Button
						variant="contained"
						color="primary"
						endIcon={<Iconify icon="mingcute:add-fill" />}
						onClick={() => setOpenAddFlight(true)}
					>
						Add Flight
					</Button>
				</div>

				<FlightsTable/>
			</Stack>

			<ModalComponent
				open={openAddFlight}
				setOpen={setOpenAddFlight}
				title="Add Flight"
				height="50vh"
				onClose={() => setOpenAddFlight(false)}
				maxWidth="md"
			>
				<NewFlight onClose={() => setOpenAddFlight(false)} />
			</ModalComponent>
		</>
	);
};

export default FlightsMain;