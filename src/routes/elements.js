import { Suspense, lazy } from "react";
// components
import LoadingScreen from "../components/loading-screen";

// ----------------------------------------------------------------------

const Loadable = (Component) => {
	const LoadableComponent = (props) => (
		<Suspense fallback={<LoadingScreen />}>
			<Component {...props} />
		</Suspense>
	);

	// Assign a display name to the LoadableComponent
	LoadableComponent.displayName = `Loadable(${
		Component.displayName || Component.name || "Component"
	})`;

	return LoadableComponent;
};

// ----------------------------------------------------------------------

// AUTH
export const LoginPage = Loadable(lazy(() => import("../pages/auth/login")));
export const RegisterPage = Loadable(
	lazy(() => import("../pages/auth/register"))
);
export const CheckEmailPage = Loadable(
	lazy(() => import("../pages/auth/check-email"))
);
export const NewPasswordPage = Loadable(
	lazy(() => import("../pages/auth/new-password"))
);
export const ResetPasswordPage = Loadable(
	lazy(() => import("../pages/auth/reset-password"))
);
export const OTPPage = Loadable(
	lazy(() => import("../pages/auth/otp-code"))
);

// PAGES
export const Page500 = Loadable(lazy(() => import("../pages/page-500")));
export const Page404 = Loadable(lazy(() => import("../pages/page-404")));
export const Page403 = Loadable(lazy(() => import("../pages/page-403")));
export const ComingSoonPage = Loadable(
	lazy(() => import("../pages/coming-soon"))
);
export const MaintenancePage = Loadable(
	lazy(() => import("../pages/maintenance"))
);

//PLAYGROUND
export const PlaygroundForms = Loadable(lazy(() => import("../pages/playground/forms")));
export const DatagridPlayground = Loadable(lazy(() => import("../pages/playground/datagrid")));
export const TimelinePlayground = Loadable(lazy(() => import("../pages/playground/timeline")));
export const CalendarPlayground = Loadable(lazy(() => import("../pages/playground/calendar")));
export const ChartPlayground = Loadable(lazy(() => import("../pages/playground/chart")));
export const AdvancedChartPlayGround = Loadable(lazy(() => import("../pages/playground/advanced-chart")));
export const ChatPlayGround = Loadable(lazy(() => import("../pages/playground/chat")));
export const KanbanPlayGround = Loadable(lazy(() => import("../pages/playground/kanban")));
export const OrgPlayGround = Loadable(lazy(() => import("../pages/playground/organization")));
export const ScrollPlaybround = Loadable(lazy(() => import("../pages/playground/scrollbar")));


// DASHBOARD
//-----------------main-----------------
//home
export const DashboardMain = Loadable(lazy(() => import("../pages/dashboard/home/home")));

//account
export const AccountOverview = Loadable(lazy(() => import("../pages/dashboard/account/overview/overview")));
export const AccountSettings = Loadable(lazy(() => import("../pages/dashboard/account/settings/settings")));
export const AccountProfile = Loadable(lazy(() => import("../pages/dashboard/account/profile/profile")));


//leads
export const Leads = Loadable(lazy(() => import("../pages/dashboard/leads/leads")));

//shipment
export const Shipment = Loadable(lazy(() => import("../pages/dashboard/shipment/shipment")));
export const Storage = Loadable(lazy(() => import("../pages/dashboard/storage/storage")));
export const Emails = Loadable(lazy(() => import("../pages/dashboard/emails/emails")))

//flights
export const Flights = Loadable(lazy(() => import("../pages/dashboard/flights/flights")));