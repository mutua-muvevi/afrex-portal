import { Page } from "../../../components/page";
import { PATH_DASHBOARD } from "../../../routes/path";

import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";

const Storage = () => {
	return (
		<Page title="Storage">
			<CustomBreadcrumbs
				heading="Storage"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Storage" },
				]}
			/>
			<div>Storage Home</div>
		</Page>
	);
};

export default Storage;
