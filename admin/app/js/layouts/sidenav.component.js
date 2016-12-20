import _ from 'lodash';
class  NavCtrl {
	constructor(User, SidenavExpanded) {
		this._User = User;
		this._SidenavExpanded = SidenavExpanded;
		this._expanded = this._SidenavExpanded.get() || false;

		this._menuItems = [
			{label: 'Home', state: 'app.home.list', iconClass: "home", roles: []},
			{label: 'Prospect', state: 'app.prospect', iconClass: "perm_phone_msg", excludeRoles: ["ROLE_AGENT"], roles: []},
			{label: 'Orders', iconClass: "swap_horiz", state: "app.orders.list", excludeRoles: ["ROLE_AGENT"], roles: []},
			{
				label: 'Logistics', state: "app.logistics.overview", iconClass: "schedule", expanded: false, excludeRoles: ["ROLE_AGENT"], roles: [],
				children: [
					{label: 'Overview', state: "app.logistics.overview", roles: ['ROLE_USER', 'ROLE_ADMIN']},
					{label: 'Agent Ops', state: "app.logistics.agent_ops.list", roles: ['ROLE_USER', 'ROLE_ADMIN']}
				]
			},
			{label: 'Finance', iconClass: "credit_card", roles: ["ROLE_USER", "ROLE_FINANCE"], excludeRoles: ["ROLE_AGENT"]},
			{label: 'Reporting', iconClass: "assessment", state: "app.reports", roles: []},
			{
				label: 'Admin', iconClass: "settings", expanded: false, roles: ['ROLE_USER', 'ROLE_ADMIN'],
				children: [
					{label: 'Agents', state: "app.admin.agent.list", roles: ['ROLE_USER', 'ROLE_ADMIN']},
					{label: 'Availability', roles: ['ROLE_USER', 'ROLE_ADMIN']},
					{label: 'Containers', state: "app.admin.inventoryTypes.list", roles: ['ROLE_USER', 'ROLE_ADMIN']},
					{label: 'Discounts', state: "app.admin.discount.list", roles: ['ROLE_USER', 'ROLE_ADMIN']},
					{label: 'Markets', state: "app.admin.market.list", roles: ['ROLE_USER', 'ROLE_ADMIN']},
					{label: 'Parameters', state: "app.admin.parameter.list", roles: ['ROLE_USER', 'ROLE_ADMIN']},
					{label: 'Warehouses', state: "app.admin.warehouse.list", roles: ['ROLE_USER', 'ROLE_ADMIN']}
				]
			},
			{
				label: 'System', iconClass: "build", expanded: false, roles: ['ROLE_USER', 'ROLE_SUPER_ADMIN'],
				children: [
					{label: 'Access', state: 'app.system.access', roles: ['ROLE_USER', 'ROLE_SUPER_ADMIN']},
					{label: 'Email', state: undefined, roles: ['ROLE_USER', 'ROLE_SUPER_ADMIN']},
					{label: 'Configuration', state: undefined, roles: ['ROLE_USER', 'ROLE_SUPER_ADMIN']}
				]
			}
		];

		if (this._expanded) {
			const item = _.find(this._menuItems, {label: this._expanded, expanded: false});
			if (item) item.expanded = true;
		}
	}

	toggleNav () {
		this._expanded = !this._expanded;
		this._SidenavExpanded.set(this._expanded);
		if (this._expanded == false) {
			_.forEach(this._menuItems, (item) => {
				item.expanded = false;
			});
		}
	}

	expandMenuitems (item) {
		if (item.children) {
			_.forEach(this._menuItems, (atom) => {
				if (item.label !== atom.label) atom.expanded = false;
			});
			item.expanded = !item.expanded;
			if (item.expanded) {
				this._expanded = true;
				this._SidenavExpanded.set(item.label);
			}
		}
	}

	isAuthorized (item) {
		return this._User.isAuthorized(item.roles, item.excludeRoles);
	}
}

NavCtrl.$inject = ['User', 'SidenavExpanded'];

let SideNav = {
	controller: NavCtrl,
	templateUrl: 'templates/layout/sidenav.html'
};

export default SideNav;
