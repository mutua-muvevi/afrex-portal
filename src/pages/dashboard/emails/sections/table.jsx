import { useState } from "react";
import DataGridCustom from "../../../../components/datagrid/custom";
import { setEmail } from "../../../../redux/slices/emails";
import { useSelector, useDispatch } from "../../../../redux/store";
import ModalComponent from "../../../../components/modal/modal";
// import EditEmail from "../edit/edit";
import DeleteEmail from "../delete/delete";

const EmailTable = () => {
	const [openDelete, setOpenDelete] = useState(false);
	const dispatch = useDispatch();
	const { emails: { data: allEmail } } = useSelector((state) => state.emails);

	const modalActions = [
		{
			label: "Delete",
			action: "delete",
			icon: "ic:baseline-delete",
			color:"error",
			onClick: (rowData) => {
				dispatch(setEmail(rowData))
				setOpenDelete(true);
			}
		},
	]

	return (
		<>
			<DataGridCustom
				data={allEmail}
				title="Email List"
				modalTitle="Email"
				modalActions={modalActions}
			/>

			<ModalComponent
				open={openDelete}
				onClose={() => setOpenEdit(false)}
				title="Edit Email"
				maxWidth="sm"
				height={250}
			>
				<DeleteEmail onClose={() => setOpenDelete(false)}/>
			</ModalComponent> 

			
		</>
	);
};

export default EmailTable;
