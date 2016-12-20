import _ from 'lodash';

class ZipcodeLookupController {
    constructor(SubMarket, Market, $scope, $mdDialog, AlertService, $q, OrdersAddressService, ConfirmDialog) {
        this.isDisabled = false;
        this.isInEdit = false;
        this._Market = Market;
        this._SubMarket = SubMarket;
        this._$mdDialog = $mdDialog;
        this._AlertService = AlertService;
        this._ConfirmDialog = ConfirmDialog;
        this._$q = $q;
        this._OrdersAddressService = OrdersAddressService;
        this.market = this.order.market;
        this.query  = {
			sort: 'zipCode',
			limit: 0,
			page: 1,
			skip: 0,
			search: ''
		};
    }

    $onChanges(changes) {
        if (!_.get(changes, 'order.currentValue.customer._id')) return;
        const zipCode = this._OrdersAddressService.getZipCodeForCustomerItems(changes.order.currentValue);
        this.query.search = zipCode;
        this.market = changes.order.currentValue.market;
    }

    isLockedOrIsInEdit() {
        return this.isLocked || this.isInEdit || this.hasCurrentlyStoredInventory();
    }

    hasCurrentlyStoredInventory() {
        return angular.isDefined(this.currentlyStoredInventory) && this.currentlyStoredInventory.length > 0;
    }
    querySearch() {
        return this.queryMarketList(this._SubMarket, this.query)
            .then(list => {
                if (list && list.length > 0) return list;
                else return this.queryMarketList(this._Market, this.query);
            });
    }

    queryMarketList(market, query) {
        return market.list(query)
            .then(response => response.data);
    }

    finalizeChange() {
        if (!this.query.search) return;
        if (this.market) {
            const zipUpdateEventObj = { zipCode: this.query.search, market: this.market };
            this.order.market = this.market;
            this.onZipUpdated({ $event: zipUpdateEventObj });
        } else this._AlertService.error('Zipcode is not serviceable.');
        this.isInEdit = false;
    }

    selectedMarketChanged(market){
        this.market = market;
    }

    cancelChange() {
        this.isInEdit = false;
    }

    startEdit() {
        if (this.isLockedOrIsInEdit()) return;
        if (this._OrdersAddressService.hasZipCodeForCustomerItems(this.order)) this.confirmZipCodeChange();
        else {
            this.market = null;
            this.isInEdit = true;
        }
    }

    confirmZipCodeChange() {
        const description = `Changing the Zipcode will change the Market/Sub-market, 
        and possibly the Agent on this order. Are you sure you wish to continue?`;
        this._ConfirmDialog
            .withDescription(description)
            .withContinueText('YES')
            .withCancelText('NO')
            .show()
            .then(() => {
                this.market = {
                    zipCode: this._OrdersAddressService.getZipCodeForCustomerItems(this.order),
                    market: this.order.market
                };
                this.isInEdit = true;
            });
    }
}

ZipcodeLookupController.$inject = ['SubMarket', 'Market', '$scope', '$mdDialog',
    'AlertService', '$q', 'OrdersAddressService', 'ConfirmDialog'];

export default ZipcodeLookupController;
