import { useState } from "react";
import DataGridCustom from "../../../../components/datagrid/custom";
import { setFlight } from "../../../../redux/slices/flights";
import { useSelector, useDispatch } from "../../../../redux/store";
import ModalComponent from "../../../../components/modal/modal";
// import EditFlight from "../edit/edit";
import DeleteFlight from "../delete/delete";
import EditFlight from "../edit/edit";

const FlightTable = () => {
	const [openEdit, setOpenEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const dispatch = useDispatch();
	const { flights: { data: allFlight } } = useSelector((state) => state.flights);

	const modalActions = [
		{
			label: "Edit",
			action: "edit",
			icon: "ic:baseline-edit",
			onClick: (rowData) => {
				dispatch(setFlight(rowData))
				setOpenEdit(true);
			}
		},
		{
			label: "Delete",
			action: "delete",
			icon: "ic:baseline-delete",
			color:"error",
			onClick: (rowData) => {
				dispatch(setFlight(rowData))
				setOpenDelete(true);
			}
		},
	]

	return (
		<>
			<DataGridCustom
				data={allFlight}
				title="Flight List"
				modalTitle="Flight"
				modalActions={modalActions}
			/>

			<ModalComponent
				open={openEdit}
				onClose={() => setOpenDelete(false)}
				title="Edit Flight"
				maxWidth="sm"
				height={250}
			>
				<EditFlight onClose={() => setOpenDelete(false)}/>
			</ModalComponent> 

			<ModalComponent
				open={openDelete}
				onClose={() => setOpenDelete(false)}
				title="Delete Flight"
				maxWidth="sm"
				height={250}
			>
				<DeleteFlight onClose={() => setOpenDelete(false)}/>
			</ModalComponent> 

			
		</>
	);
};

export default FlightTable;
