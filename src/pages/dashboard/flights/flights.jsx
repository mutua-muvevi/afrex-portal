import { Page } from "../../../components/page";
import { PATH_DASHBOARD } from "../../../routes/path";

import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import FlightsMain from "./sections/main";

const Flights = () => {
	return (
		<Page title="Flights">
			<CustomBreadcrumbs
				heading="Flights"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Flights" },
				]}
			/>
			<FlightsMain/>
		</Page>
	);
};

export default Flights;
