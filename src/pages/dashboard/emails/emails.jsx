import { Page } from "../../../components/page";
import { PATH_DASHBOARD } from "../../../routes/path";

import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import EmailsMain from "./sections/main";
// import LeadMain from "./sections/main";

const Emails = () => {
	return (
		<Page title="Newsletter Emails">
			<CustomBreadcrumbs
				heading="Newsletter Emails"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Emails" },
				]}
			/>
			<EmailsMain/>
		</Page>
	);
}

export default Emails