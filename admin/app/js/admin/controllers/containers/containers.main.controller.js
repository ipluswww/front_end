import _ from 'lodash';
class  ContainersMainController {

	constructor ($scope, $state){
		this._$state = $state;
		let statesArray = ["containerTypes", "inventoryTypes", "roomTypes"];
		for (let i = 0; i < 3; i++) {
			if (this._$state.current.name.indexOf(statesArray[i]) > 0) this.selectedIndex = i;
		}

		$scope.$watch(() => this.selectedIndex, function (newVal) {
			// avoid infinite loop
			if ($state.current.name.indexOf(statesArray[newVal]) > 0) return;
			$state.go("app.admin." + statesArray[newVal] + ".list");
		});
	}
}

ContainersMainController.$inject = ['$scope', '$state'];
export default ContainersMainController;
