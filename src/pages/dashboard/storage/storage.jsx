import { Page } from "../../../components/page";
import { PATH_DASHBOARD } from "../../../routes/path";

import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import StorageMain from "./sections/main";

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
			<StorageMain/>
		</Page>
	);
};

export default Storage;
