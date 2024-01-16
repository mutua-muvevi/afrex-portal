import { Button, Stack } from "@mui/material";
import Iconify from "../../../../components/iconify";
import EmailsTable from "./table";
import { useState } from "react";
import ModalComponent from "../../../../components/modal/modal";
// import AddEmail from "../new/new";

const EmailsMain = () => {
	const [ openAddEmail, setOpenAddEmail ] = useState(null)

	const handleAddEmail = () => {
		setOpenAddEmail(true)
	}

	return (
		<>
			<Stack direction="column" spacing={3}>

				<EmailsTable/>
			</Stack>

			<ModalComponent
				open={openAddEmail}
				setOpen={setOpenAddEmail}
				title="Add Email"
				height="70vh"
				onClose={() => setOpenAddEmail(false)}
				maxWidth="xl"
			>
				{/* <AddEmail onClose={() => setOpenAddEmail(false)} /> */}
			</ModalComponent>
		</>
	);
};

export default EmailsMain;