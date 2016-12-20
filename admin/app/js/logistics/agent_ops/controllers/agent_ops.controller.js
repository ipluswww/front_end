class AgentOpsController {
	constructor(AppConstants, $state, $scope) {
		this.appName = AppConstants.appName;
		this._$state = $state;
		this._$scope = $scope;
		this.init();
	}

	init () {
		let statesArray = ["list", "calendar"];
		for (let i = 0; i < statesArray.length + 1; i++) {
			if (this._$state.current.name.indexOf(statesArray[i]) > 0) this.selectedIndex = i;
		}

		const self = this;
		const unbindTabWatch = this._$scope.$watch(() => this.selectedIndex, function (newVal) {
			newVal = newVal || 0;
			// avoid infinite loop
			if (self._$state.current.name.indexOf(statesArray[newVal]) > 0) return;
			self._$state.go("app.logistics.agent_ops." + statesArray[newVal]);
		});
		this._$scope.$on('$destroy', () => {
			unbindTabWatch();
		});
	}
}

AgentOpsController.$inject = ['AppConstants', '$state', '$scope'];
export default AgentOpsController;