// routes
import { PATH_DASHBOARD } from "../../../routes/path";

// ----------------------------------------------------------------------

const ICONS = {
	//main
	home: "heroicons:home-solid",

	leads: "mdi:leads",
	shipment: "mdi:truck-delivery",
	storage: "mdi:warehouse",
};

const navConfig = [
	//MAIN
	//----------------------------------------------------------------------
	{
		subheader: "main",
		items: [

			// leads
			{
				title: "leads",
				path: PATH_DASHBOARD.general.leads,
				icon: ICONS.leads,
			},

			// shipment
			{
				title: "shipment",
				path: PATH_DASHBOARD.general.shipment,
				icon: ICONS.shipment,
			},

			// leads
			{
				title: "storage",
				path: PATH_DASHBOARD.general.storage,
				icon: ICONS.storage,
			},
		],
	},

	
];

export default navConfig;
