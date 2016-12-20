import _ from 'lodash';
import moment from 'moment';
import d3 from 'd3';
class  MarketDetailController {

	constructor ($state, $stateParams, $q, User, Market, SubMarket, Zones, Warehouse, QueryData, $mdDialog, $mdToast, $window){
		this._edit = $state.current.data.edit;
		this._$state = $state;
		this._$q = $q;
		this._User = User;
		this._Market = Market;
		this._SubMarket = SubMarket;
		this._Service = Market;
		this._Zones = Zones;
		this._Warehouse = Warehouse;
		this._QueryData = QueryData;
		this._id = $stateParams.id;
		this._$mdDialog = $mdDialog;
		this._$mdToast = $mdToast;
		this._$window = $window;

		this.init();
	}

	// Initialize controller variable
	// Call to GET /markets/:id and/or submarkets/:id
	//
	init () {
		// controller variable
		this.originalData = {}; // For duplication check
		this._subMarket = false;
		this.pricingHistoricalData = null;

		// First check with market and got with submarket.
		if (this._id) {
			this._Market.get(this._id).then( (res) => {
				this.data= _.clone(res);
				this.originalData.name = res.name;
				this.originalData.shortName = res.shortName;
				this.originalData.title = res.title;
				this.originalData.warehousesWithInfo = _.clone(res.warehousesWithInfo);

				this.pricesData = this.data.pricePerPointRef ? _.map(this.data.pricePerPointRef.pricePerPoint, 'price') : null;

				// For historical pricing data, we need another handling
				this._Service.getPricing(this._id).then( (res) => {
					this.pricingHistoricalData = res.data.data;
					// based pricing information, we prepare chart data
					this.prepareChartData();
				});

			}, (err) => {
				this._Service = this._SubMarket;
				this._SubMarket.get(this._id).then( (res) => {
					this._subMarket = true;
					this.data = _.clone(res);

					this.originalData.name = res.name;
					this.originalData.shortName = res.shortName;
					this.originalData.title = res.title;
					this.originalData.warehousesWithInfo = _.clone(res.warehousesWithInfo);

					this.pricesData = this.data.pricePerPointRef ? _.map(this.data.pricePerPointRef.pricePerPoint, 'price') : null;

					// For historical pricing data, we need another handling
					this._Service.getPricing(this._id).then( (res) => {
						this.pricingHistoricalData = res.data.data;
						// based pricing information, we prepare chart data
						this.prepareChartData();
					});
				});
			});

		} else {
			this.data = this.defaultObject();
		}

		this.timezones = this._Zones.get(); // Timezone control list

	}

	defaultObject () {
		return {
			insuranceFactor: 0.006,
			active: false,
			comingSoon: false
		};
	}

	openMarketModal() {
	
		this._$mdDialog.show({
			controller: 'ParentMarketModalController as $ctrl',
			templateUrl: 'templates/shared/_parent_market_dialog.html',
			parent: angular.element(document.body),
			clickOutsideToClose:false,
			locals: { data: this.data.market }
		}).then( (res) => {
			this.data.market = _.clone(res.data);
		});
	
	}


	openWarehouseModal() {
		this._$mdDialog.show({
			controller: 'MarketWarehouseModalController as $ctrl',
			templateUrl: 'templates/shared/_warehouse_dialog.html',
			parent: angular.element(document.body),
			clickOutsideToClose:false,
			locals: { data: this.data.warehousesWithInfo }
		}).then( (res) => {
			this.data.warehousesWithInfo = _.clone(res.data);
		});
	}

	// check the uniqness based on type
	checkUniq (type) {
		if (!this.originalData || !this.originalData[type] || this.originalData[type] !== this.data[type]) {
			if (this.data[type]) {
				// we should check not only market but also sub market.
				this._Market.checkUniq(type, this.data[type]).then((res) => {
					this.marketForm[type].$setValidity("server", res.data.valid);
					if (res.data.valid === true) {
						this._SubMarket.checkUniq(type, this.data[type]).then((res) => {
							this.marketForm[type].$setValidity("server", res.data.valid);
						});
					}
				});

			}
		} else {
			this.marketForm[type].$setValidity("server", true);
		}
	}

	// Button event handler
	cancelEdit () {
		this._$state.go('app.admin.market.list');
	}


	// Save button event click handler
	saveData() {
		let self = this;

		// Pre-save actions.
		// it includes
		//  - serviceablePostalCodes conversion from UI-friendly collection to array
		//  - not sending pricing information directly ON PUT/POST, it should be an another request.
		let data = _.clone(this.data);
		data.serviceablePostalCodes = _.map(data.serviceablePostalCodes, 'text');
		delete data.warehousesWithInfo;

		if (data.market) {
			this._Service = this._SubMarket;
			data.market = data.market._id ? data.market._id : data.market;
		}

		let pricingData = this.preparePricingDataForSave();
		delete data.pricePerPointRef;

		// as it involves several other async operation, we are going to use promise.all
		let promises = [];
		// Update existing market
		if(this._id) {
			promises.push(this._Service.update(data));
			promises.push(this._Service.updatePricing(this._id, pricingData));
			promises.push(this.updateWarehouses());
			this._$q.all(promises).then( () => {
				self.provideFeedback("A market information has been updated successfully").then( () => {
					self._$state.go('app.admin.market.detail', {id: this._id});
				});
			});
		} else {
			// for POST /market, we have to send the pricing data along with the main data.
			data.pricing = pricingData;

			// create a new market
			this._Service.create(data).then( (res) => {
				this._id = res.id;
				promises.push(this.updateWarehouses());
				this._$q.all(promises).then( () => {
					self.provideFeedback("A new market has been created successfully").then(() => {
						self._$state.go('app.admin.market.detail', {id: res._id});
					});
				});
			});
		}
	}


	// update warehouse.
	// It is very complex in frontend part and should be handled in a standalone route
	updateWarehouses () {
		let warehousesConcern = [].concat(this.data.warehousesWithInfo, this.originalData.warehousesWithInfo);

		let promises = [];
		_.forEach(warehousesConcern, (warehouse) => {
			if (!warehouse) return;
			let associatedMarkets = _.clone(warehouse.associatedMarkets) || [];
			_.remove(associatedMarkets, {_id: this._id});
			if (_.findIndex(this.data.warehousesWithInfo, {_id: warehouse._id}) >= 0) {
				associatedMarkets.push(this._id);
			}
			associatedMarkets= _.uniq(associatedMarkets);

			if ((_.difference(associatedMarkets, _.map(warehouse.associatedMarkets, '_id')).length > 0)  || (_.difference(_.map(warehouse.associatedMarkets, '_id'), associatedMarkets).length > 0)){
				warehouse.associatedMarkets = associatedMarkets;
				promises.push(this._Warehouse.update(warehouse));
			}
		});

		return this._$q.all(promises);
	}


	// FUTURE USAGE NOT considering even delete at the moment
	// The helper function: only record created within 24 hours is deletable
	isDeletable() {
		if (this.data && this.data._id && this.data.dateCreated) {
			return (moment.utc().diff(moment.utc(this.data.dateCreated), 'hours') <= 24);
		}
		return false;
	}


	// Helper functions
	//------------------------------------------------------------------------------------------------------------------
	// show feedback of action taken.
	provideFeedback(message) {
		var el = angular.element(document.getElementById("marketDetail"));
		return this._$mdToast.show(
			this._$mdToast.simple()
				.textContent(message)
				.position('bottom right')
				.hideDelay(3000)
				.parent(el)
		);
	}





	// Generate pricing data for chart.
	// TODO: Get synced with the updated the pricing data.
	prepareChartData() {

		this.options = {
			chart: {
				type: 'lineChart',
				height: 450,
				margin : {
					top: 20,
					right: 20,
					bottom: 40,
					left: 55
				},
				x: function(d){ return d.point; },
				y: function(d){ return d.price; },
				useInteractiveGuideline: true,
				dispatch: {
					stateChange: function(e){ console.log("stateChange"); },
					changeState: function(e){ console.log("changeState"); },
					tooltipShow: function(e){ console.log("tooltipShow"); },
					tooltipHide: function(e){ console.log("tooltipHide"); }
				},
				xAxis: {
					axisLabel: 'Point'
				},
				yAxis: {
					axisLabel: 'Price ($)',
					tickFormat: function(d){
						return d3.format('.02f')(d);
					},
					axisLabelDistance: -10
				},
				callback: function(chart){
					console.log("!!! lineChart callback !!!");
				}
			},
			title: {
				enable: true,
				text: 'Price Per Point'
			}
		};

		if (this.pricingHistoricalData && this.pricingHistoricalData.length > 0) {
			this.selectedRevision = this.pricingHistoricalData[0].revision;
			// pricePerPointRef is expected to be array.
			this.pricingData = _.map(this.pricingHistoricalData, (atom, i) => {
				return {
					values: atom.pricePerPoint,      //values - represents the array of {x,y} data points
					key: 'Revision ' + atom.revision + '(' + moment(atom.lastUpdated).format("YYYY-MM-DD") + ')', //key  - the name of the series.
					color: d3.scale.category10()[i]
				}
			});
		}
	};

	revisionChange(revision) {
		let revisionIndex = _.findIndex(this.pricingHistoricalData, {'revision': parseInt(revision)});
		if ( revisionIndex >=0 ) this.pricesData =  _.map(this.pricingHistoricalData[revisionIndex].pricePerPoint, 'price');
	}

	preparePricingDataForSave() {
		//  - prepare pricing information if qualified
		let originalPricingData = (this.data.pricePerPointRef) ? _.map(_.clone(this.data.pricePerPointRef.pricePerPoint), 'price') : null;
		let pricingData = null;
		if (!this.pricesData || this.pricesData.length < 1) {
			this.marketForm.pricesData.$setValidity("required", false);
			return null;
		}
		if (Number(this.pricesData[0]) !== 0) {
			this.marketForm.pricesData.$setValidity("pattern", false);
			return null;
		}

		// first check if it qualifies, if there is any difference
		if ((_.difference(originalPricingData, this.pricesData).length > 0) || (_.difference(this.pricesData, originalPricingData).length > 0)) {

			let invalid = false;
			pricingData = _.map(this.pricesData, (atom, $index) => {
				if (isNaN(atom)) invalid = true;
				return ({point: $index, price: Number(atom)});
			});

			if (invalid === true) return null; else return {pricePerPoint: pricingData};

		}
		return null;
	}

	// Back to previous location
	backTo () {
		this._$window.history.back();
	}

	// Back to list
	backToList() {
		this._QueryData.setQuery('markets', null);
		this._$state.go('app.admin.market.list');
	}

}

MarketDetailController.$inject = ['$state', '$stateParams', '$q', 'User', 'Market', 'SubMarket', 'Zones', 'Warehouse', 'QueryData', '$mdDialog', '$mdToast', '$window'];
export default MarketDetailController;
