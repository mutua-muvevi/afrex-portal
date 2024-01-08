import { Page } from "../../../components/page";
import { PATH_DASHBOARD } from "../../../routes/path";

import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import ShipmentMain from "./sections/main";

const Shipment = () => {
	return (
		<Page title="Shipment">
			<CustomBreadcrumbs
				heading="Shipment"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Shipment" },
				]}
			/>
			<ShipmentMain/>
		</Page>
	);
};

export default Shipment;
