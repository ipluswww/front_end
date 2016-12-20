class SidenavExpanded {
	constructor() {
		this._expanded = false;
	}

	get() {
		return this._expanded;
	}

	set(expanded) {
		this._expanded = expanded;
	}

}

export default SidenavExpanded;