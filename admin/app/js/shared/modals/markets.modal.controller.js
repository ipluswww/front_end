import _ from 'lodash';
class MarketsController {
	constructor(Market, $mdDialog, markets) {
		this._Market = Market;
		this._$mdDialog = $mdDialog;

		this.markets = _.clone(markets) || [];
		this.init();
	}

	init  () {
		// Init varialble
		this._Market.all().then( (res) => {
			this.allMarkets = res.data;
		})
	}

	// Helper functions
	//------------------------------------------------------------------------------------------------------------------

	// Checkbox list helper functions
	//----------------------------------------------------------------------------------
	// Check item is existing in the list with the proven key
	exists (item, key) {
		return (_.findIndex(this.markets, (atom) => {
			return item[key] === atom[key];
		}) >=0);
	}

	// Adds or removes an item based on existence
	toggle (item, key) {
		if (this.exists(item, key)) {
			_.remove(this.markets, (atom) => {
				return item[key] === atom[key];
			});
		} else {
			this.markets.push(item);
		}
	}

	// Toggle All Markets
	toggleAll () {
		if (this.markets.length === this.allMarkets.length) {
			this.markets = [];
		} else {
			this.markets = _.clone(this.allMarkets);
		}
	}
	//------------------------------------------------------------------------------------------------------------------


	cancel() {
		this._$mdDialog.cancel();
	}

	confirm() {
		this._$mdDialog.hide({markets: this.markets, isAllMarkets: (this.markets.length == this.allMarkets.length)});
	}

}

MarketsController.$inject = ['Market', '$mdDialog', 'markets'];
export default MarketsController;
