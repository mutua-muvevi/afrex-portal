// routes
import { PATH_DASHBOARD } from "../../../routes/path";

// ----------------------------------------------------------------------

const ICONS = {
	//main
	home: "heroicons:home-solid",

	leads: "mdi:leads",
};

const navConfig = [
	//MAIN
	//----------------------------------------------------------------------
	{
		subheader: "main",
		items: [
			//main
			{
				title: "home",
				path: PATH_DASHBOARD.general.home,
				icon: ICONS.home,
			},

			// leads
			{
				title: "leads",
				path: PATH_DASHBOARD.general.leads,
				icon: ICONS.leads,
			},
		],
	},

	
];

export default navConfig;
