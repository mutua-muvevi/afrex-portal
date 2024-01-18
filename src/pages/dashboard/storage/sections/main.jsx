import { Button, Stack } from "@mui/material";
import Iconify from "../../../../components/iconify";
import StorageTable from "./table";
import { useState } from "react";
import ModalComponent from "../../../../components/modal/modal";
import AddStorage from "../new/new";

const StorageMain = () => {
	const [ openAddStorage, setOpenAddStorage ] = useState(null)

	const handleAddStorage = () => {
		setOpenAddStorage(true)
	}

	return (
		<>
			<Stack direction="column" spacing={3}>
				<div>
					<Button
						variant="contained"
						color="primary"
						endIcon={<Iconify icon="mingcute:add-fill" />}
						onClick={handleAddStorage}
					>
						Add Storage
					</Button>
				</div>

				<StorageTable/>
			</Stack>

			<ModalComponent
				open={openAddStorage}
				setOpen={setOpenAddStorage}
				title="Add Storage"
				height="50vh"
				onClose={() => setOpenAddStorage(false)}
				maxWidth="lg"
			>
				<AddStorage onClose={() => setOpenAddStorage(false)} />
			</ModalComponent>
		</>
	);
};

export default StorageMain;