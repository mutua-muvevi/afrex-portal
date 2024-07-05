const path = (root, sublink) => {
	return `${root}${sublink}`;
};

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/admin";

//auth path
export const PATH_AUTH = {
	root: ROOTS_AUTH,
	login: path(ROOTS_AUTH, "/login"),
	register: path(ROOTS_AUTH, "/register"),
	loginUnprotected: path(ROOTS_AUTH, "/login-unprotected"),
	registerUnprotected: path(ROOTS_AUTH, "/register-unprotected"),
	otp: path(ROOTS_AUTH, "/otp"),
	verify: path(ROOTS_AUTH, "/verify"),
	resetPassword: path(ROOTS_AUTH, "/reset-password"),
	newPassword: path(ROOTS_AUTH, "/new-password"),
};

export const PLAYGROUND = {
	chat: {
		root: path(ROOTS_DASHBOARD, "/chat"),
		new: path(ROOTS_DASHBOARD, "/chat/new"),
		view: (name) => path(ROOTS_DASHBOARD, `/chat/${name}`),
	},
};

//dashboard path
export const PATH_DASHBOARD = {
	root: ROOTS_DASHBOARD,
	permissionDenied: path(ROOTS_DASHBOARD, "/permission-denied"),
	blank: path(ROOTS_DASHBOARD, "/blank"),

	//main
	general: {
		//home:
		home: path(ROOTS_DASHBOARD, "/leads"),

		//account:
		account: {
			root: path(ROOTS_DASHBOARD, "/account"),
			overview: path(ROOTS_DASHBOARD, "/account/overview"),
			settings: path(ROOTS_DASHBOARD, `/account/settings`),
			profile: path(ROOTS_DASHBOARD, "/account/profile"),
		},

		// leads:
		leads: path(ROOTS_DASHBOARD, "/leads"),

		//shipment
		shipment: path(ROOTS_DASHBOARD, "/shipment"),

		// storage
		storage: path(ROOTS_DASHBOARD, "/storage"),

		//emails
		emails: path(ROOTS_DASHBOARD, "/emails"),

		//flights
		flights: path(ROOTS_DASHBOARD, "/flights"),
	},



};

//other paths

export const PATH_PAGE = {
	comingSoon: "/coming-soon",
	maintenance: "/maintenance",
	pricing: "/pricing",
	payment: "/payment",
	about: "/about-us",
	contact: "/contact-us",
	faqs: "/faqs",
	page403: "/403",
	page404: "/404",
	page500: "/500",
	components: "/components",
};
