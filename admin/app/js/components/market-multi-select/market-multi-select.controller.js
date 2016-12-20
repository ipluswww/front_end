import $ from 'jquery';
import _ from 'lodash';
class MarketMultiSelectController {
	constructor(Market, $window, $scope) {
		this._Market = Market;
		this._$window = $window;
		this._$scope = $scope;
		this.init();
		this.ngInputMarkets = _.cloneDeep(this.ngInputMarkets);
		this.hasSelectionChanged = false;
	}


	init () {
		this.expanded = false; // Variable indicating if the select panel is opened

		if (this.ngInputMarkets && this.ngInputMarkets.length > 0) {
			this.allMarkets = _.cloneDeep(this.ngInputMarkets);
		} else {
			const q = {
				limit: 0,
				page: 1
			};
			this._Market.list(q).then((res) => {
				this.allMarkets = res.data;
				if (this.list === null) {
					this.list = _.cloneDeep(this.allMarkets);
				} else if (this.list === undefined) {
					this.list = [];
				}
			});
		}
	}

	// Expand and collapse the component
	toggleComponent(e) {
		// e.stopPropagation();
		let self = this;
		this.expanded = !this.expanded;

		// FIXME: very dirty stuff
		$(".disposition-multi-select .multi-select-list").hide();

		//
		if (this.expanded ) {
			e.stopPropagation();
		}
	}

	// TODO: we should care about clicking on disposition component
	closeWhenClickingElsewhere(event, callbackOnClose) {

		var clickedElement = event.target;

		if (!clickedElement) return;

		let parentEl = this.findAncestor(clickedElement, 'market-multi-select');

		if (!parentEl) {
			callbackOnClose();
			return;
		}

	}

	closeThis() {
		this.expanded = false;
	}

	// Pure helper function : equivalent of jquery.closest('')
	findAncestor (el, cls) {
		while ((el = el.parentElement) && !el.classList.contains(cls));
		return el;
	}


	// For display purpose on component header, just pluck name of markets only
	selectedMarketNames() {
		let list = _.map(this.list, "name");
		if (!list || list.length < 0) return "No market has been selected";
		return list.join(", ");
	}

	// To toggle the market in the list(including submarkets)
	toggle(market) {
		let marketIndex = this.isExist(market);
		if (marketIndex < 0 ) {
			this.list.push(market);
			_.forEach(market.subMarkets, (subMarket) => {
				this.list.push(subMarket);
			});
		} else {
			this.list.splice(marketIndex, 1);
			_.forEach(market.subMarkets, (subMarket) => {
				_.remove(this.list, {_id: subMarket._id});
			});
		}
		this.hasSelectionChanged = true;
		this.select();
	}

	isExist(market) {
		return _.findIndex(this.list, {_id: market._id});
	}

	selectAll() {
		_.forEach(this.allMarkets, (market) => {
			if (this.isExist(market) < 0) this.list.push(market);
			_.forEach(market.subMarkets, (subMarket) => {
				if (this.isExist(subMarket) < 0) this.list.push(subMarket);
			});
		});
		this.hasSelectionChanged = true;
		this.select();
	}

	deselectAll() {
		while (this.list.length) {
			this.list.pop();
		}
		this.hasSelectionChanged = true;
		this.select();
	}

	select() {
		if(this.hasSelectionChanged){
			this.onSelect();
			this.hasSelectionChanged = false;
		}
	}
}

MarketMultiSelectController.inject = ['Market', '$window', '$scope'];

export default MarketMultiSelectController;
