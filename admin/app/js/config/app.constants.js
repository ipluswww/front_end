const AppConstants = {
	api: 'http://dev.api.closetbox.me:3000',
	jwtKey: 'jwtToken',
	appName: 'In The Box',
	googleApiKey: 'AIzaSyDXoPlzx_oEEJutAZboAZy-iaWRHB3-De8',
	orderTypes: {
		pickup: 'pickup',
		delivery: 'delivery'
	},
	dispositions: {
		accepted: 'ACCEPTED',
		aged: 'AGED',
		cancelled: 'CANCELLED',
		closed: 'CLOSED',
		completed: 'COMPLETED',
		created: 'CREATED',
		inTransit: 'IN_TRANSIT',
		late: 'LATE',
		paymentHold: 'PAYMENT_HOLD',
		prospect: 'PROSPECT',
		reconciled: 'RECONCILED',
		requested: 'REQUESTED',
		scheduled: 'SCHEDULED',
		updated: 'UPDATED'
	},
	unauthorizedRedirectRoute: 'app.home.list',
	metersToMilesFactor: 1609.344,
	allowableDeliveryMilesFromCustomer: 40,
	roles: {
		user: 'ROLE_USER',
		admin: 'ROLE_ADMIN',
		customer: 'ROLE_CUSTOMER',
		agent: 'ROLE_AGENT',
		superAdmin: 'ROLE_SUPER_ADMIN',
		allowEdit: 'ROLE_ALLOW_EDIT',
		finance: 'ROLE_FINANCE'
	}
};

export default AppConstants;
