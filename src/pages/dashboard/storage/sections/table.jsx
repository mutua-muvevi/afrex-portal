import { useState } from "react";
import DataGridCustom from "../../../../components/datagrid/custom";
import { setStorage } from "../../../../redux/slices/storage";
import { useSelector, useDispatch } from "../../../../redux/store";
import ModalComponent from "../../../../components/modal/modal";
import EditStorage from "../edit/edit";
import DeleteStorage from "../delete/delete";

const StorageTable = () => {
	const [openEdit, setOpenEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const dispatch = useDispatch();
	const { storages: { data: allStorage } } = useSelector((state) => state?.storage);

	const modalActions = [
		{
			label: "Edit",
			action: "edit",
			icon: "ic:baseline-edit",
			onClick: (rowData) => {
				dispatch(setStorage(rowData))
				setOpenEdit(true);
			}
		},
		{
			label: "Delete",
			action: "delete",
			icon: "ic:baseline-delete",
			color:"error",
			onClick: (rowData) => {
				dispatch(setStorage(rowData))
				setOpenDelete(true);
			}
		},
	]

	return (
		<>
		{console.log("all storage", allStorage)}
			<DataGridCustom
				data={allStorage}
				title="Storage List"
				modalTitle="Storage"
				modalActions={modalActions}
			/>

			<ModalComponent
				open={openEdit}
				onClose={() => setOpenEdit(false)}
				title="Edit Storage"
				height="50vh"
				maxWidth="lg"
			>
				<EditStorage onClose={() => setOpenEdit(false)}/>
			</ModalComponent>

			<ModalComponent
				open={openDelete}
				onClose={() => setOpenEdit(false)}
				title="Delete Storage"
				maxWidth="sm"
				height={250}
			>
				<DeleteStorage onClose={() => setOpenDelete(false)}/>
			</ModalComponent>

			
		</>
	);
};

export default StorageTable;
