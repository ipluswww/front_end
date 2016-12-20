import _ from 'lodash';
class DispositionMultiSelectController {
	constructor($window, $scope, AppConstants) {
		this._$window = $window;
		this._$scope = $scope;
		this._AppConstants = AppConstants;
		this.init();
		this.list = this.list;
	}


	init () {
		this.expanded = false; // Variable indicating if the select panel is opened

		this.allData = _.map( _.values(this._AppConstants.dispositions), v => { 
			return {text: v}; 
		});

		if (this.list === null) {
			this.list = _.cloneDeep(this.allData);
		} else if (this.list === undefined) {
			this.list = [];
		}
	}

	// Expand and collapse the component
	toggleComponent(e) {
		let self = this;
		this.expanded = !this.expanded;


		if (this.expanded ) {
			e.stopPropagation();
		}
	}



	closeThis() {
		this.expanded = false;
	}

	closeWhenClickingElsewhere(event, callbackOnClose) {

		var clickedElement = event.target;

		if (!clickedElement) return;

		let parentEl = this.findAncestor(clickedElement, 'disposition-multi-select');

		if (!parentEl) {
			callbackOnClose();
			return;
		}

	}

	// Pure helper function : equivalent of jquery.closest('')
	findAncestor (el, cls) {
		while ((el = el.parentElement) && !el.classList.contains(cls));
		return el;
	}


	// For display purpose on component header, just pluck name of markets only
	selectedDispositionNames() {
		if (this.list && this.list.length  > 0) {
			return _.map(this.list, 'text').join(", ");
		}
		return "No Disposition Selected Yet";
	}

	// To toggle the market in the list(including submarkets)
	toggle(disposition) {
		const index = this.findIndex(disposition);
		if (index < 0) {
			this.list.push(disposition);
		} else {
			this.list.splice(index, 1);
		}
		this.select();
	}

	isExist(disposition) {
		let list = _.map(this.list, 'text');
		return (list.indexOf(disposition.text) >= 0);
	}

	findIndex(disposition) {
		let list = _.map(this.list, 'text');
		return list.indexOf(disposition.text);
	}

	selectAll() {
		while (this.list.length) {
			this.list.pop();
		}
		_.forEach(this.allData, (disposition) => {
			this.list.push(disposition);
		});
		this.select();
	}

	deselectAll() {
		while (this.list.length) {
			this.list.pop();
		}
		this.select();
	}

	select() {
		this.expanded = false;
		this.onSelect();
	}

}

DispositionMultiSelectController.$inject = ['$window', '$scope', 'AppConstants']

export default DispositionMultiSelectController;
