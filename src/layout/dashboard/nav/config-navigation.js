// routes
import { PATH_DASHBOARD } from "../../../routes/path";

// ----------------------------------------------------------------------

const ICONS = {
	//main
	home: "heroicons:home-solid",

	leads: "mdi:leads",
	shipment: "mdi:truck-delivery",
	storage: "mdi:warehouse",
	email: "dashicons:email-alt",
	flights: "emojione-monotone:airplane-arrival",
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

			// storage
			{
				title: "storage",
				path: PATH_DASHBOARD.general.storage,
				icon: ICONS.storage,
			},

			// emails
			{
				title: "emails",
				path: PATH_DASHBOARD.general.emails,
				icon: ICONS.email,
			},

			//flights
			{
				title: "flights",
				path: PATH_DASHBOARD.general.flights,
				icon: ICONS.flights,
			},
		],
	},

	
];

export default navConfig;
