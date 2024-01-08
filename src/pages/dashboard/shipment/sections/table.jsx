import { useState } from "react";
import DataGridCustom from "../../../../components/datagrid/custom";
import { setShipment } from "../../../../redux/slices/shipment";
import { useSelector, useDispatch } from "../../../../redux/store";
import ModalComponent from "../../../../components/modal/modal";
import EditShipment from "../edit/edit";
import DeleteShipment from "../delete/delete";

const ShipmentTable = () => {
	const [openNew, setOpenNew] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const dispatch = useDispatch();
	const { shipments: { data: allShipment } } = useSelector((state) => state.shipment);

	const modalActions = [
		{
			label: "EDit",
			action: "edit",
			icon: "ic:baseline-edit",
			onClick: (rowData) => {
				dispatch(setShipment(rowData))
				setOpenEdit(true);
			}
		},
		{
			label: "Delete",
			action: "delete",
			icon: "ic:baseline-delete",
			color:"error",
			onClick: (rowData) => {
				dispatch(setShipment(rowData))
				setOpenDelete(true);
			}
		},
	]

	return (
		<>
			<DataGridCustom
				data={allShipment}
				title="Shipment List"
				modalTitle="Shipment"
				modalActions={modalActions}
			/>

			<ModalComponent
				open={openEdit}
				onClose={() => setOpenEdit(false)}
				title="EDit Shipment"
				height="70vh"
			>
				<EditShipment onClose={() => setOpenEdit(false)}/>
			</ModalComponent>

			<ModalComponent
				open={openDelete}
				onClose={() => setOpenEdit(false)}
				title="Edit Shipment"
				maxWidth="sm"
				height={250}
			>
				<DeleteShipment onClose={() => setOpenDelete(false)}/>
			</ModalComponent>

			
		</>
	);
};

export default ShipmentTable;
