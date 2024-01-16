import { Navigate, useRoutes } from "react-router-dom";
// auth
import AuthGuard from "../auth/auth-guard";
import GuestGuard from "../auth/guest-guard";
import OTPGuard from "../auth/otp-guard";

// layouts
import DashboardLayout from "../layout/dashboard/layout";

//elements
import {
	LoginPage,
	RegisterPage,
	CheckEmailPage,
	NewPasswordPage,
	ResetPasswordPage,
	Page500,
	Page403,
	Page404,
	ComingSoonPage,
	MaintenancePage,

	OTPPage,

	//-----------account----------------
	AccountOverview,
	AccountSettings,
	AccountProfile,

	//-----------home-------------------
	DashboardMain,
	Leads,
	Shipment,
	Storage,
	Emails,
	Flights,
} from "./elements";

import CompactLayout from "../layout/compact/compact-layout";

// ----------------------------------------------------------------------
export default function Router() {
	return useRoutes([
		// auth ---------------------------
		{
			path: "auth",
			children: [
				{
					path: "login",
					element: (
						<GuestGuard>
							<LoginPage />
						</GuestGuard>
					),
				},
				{
					path: "register",
					element: (
						<OTPGuard>
							<RegisterPage />
						</OTPGuard>
					),
				},
				{
					element: <CompactLayout />,
					children: [
						{
							path: "reset-password",
							element: <ResetPasswordPage />,
						},
						{
							path: "new-password/:resetToken",
							element: <NewPasswordPage />,
						},
						{ path: "verify", element: <CheckEmailPage /> },
						{
							path: "otp",
							element: (
								<GuestGuard>
									<OTPPage />
								</GuestGuard>
							),
						},
					],
				},
			],
		},

		// dashboard -------------------------
		{
			path: "admin",
			element: (
				<AuthGuard>
					<DashboardLayout />
				</AuthGuard>
			),
			children: [
				{ path: "home", element: <DashboardMain/> },
				{
					path: "account",
					children: [
						{
							element: (
								<Navigate
									to="/admin/account/overview"
									replace
								/>
							),
							index: true,
						},
						{ path: "overview", element: <AccountOverview /> },
						{ path: "settings", element: <AccountSettings /> },
						{ path: "profile", element: <AccountProfile /> },
					],
				},

				{ path: "leads", element: <Leads /> },

				{ path: "shipment", element: <Shipment/> },

				{ path: "storage", element: <Storage/> },

				{ path: "emails", element: <Emails/> },

				{ path: "flights", element: <Flights/> },

				
				// { path: "*", element: <Navigate to="/404" replace /> },
			],
		},
		{ path: "/", element: <Navigate to="/admin/home" replace /> },

		//other ----------------------------------
		{
			element: <CompactLayout />,
			children: [
				{ path: "coming-soon", element: <ComingSoonPage /> },
				{ path: "maintenance", element: <MaintenancePage /> },
				{ path: "500", element: <Page500 /> },
				{ path: "404", element: <Page404 /> },
				{ path: "403", element: <Page403 /> },
			],
		},
		{ path: "*", element: <Navigate to="/404" replace /> },
	]);
}
