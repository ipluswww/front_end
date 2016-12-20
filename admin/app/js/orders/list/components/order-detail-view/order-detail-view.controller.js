import _ from 'lodash';
import moment from 'moment';

class OrderDetailViewController {
    constructor($scope, Order, Custmer, Agent, Container, AppConstants, OrdersValidationService, $mdDialog, AlertService) {
        this._$scope = $scope;
        this._Agent = Agent;
        this._Order = Order;
        this._Customer = Custmer;
        this._Container = Container;
        this._AppConstants = AppConstants;
        this._OrdersValidationService = OrdersValidationService;
        this._$mdDialog = $mdDialog;
        this._AlertService = AlertService;
        this.init();
    }

    init() {
        this.customerInventories = [];
        this.customerSpace = [];
        

		this.bookmarkList = [
			{
				domSelector: "#orderID",
				iconClass: "vertical_align_top",
				tooltip: "Back to top"
			},
			{
				domSelector: "#orderNote",
				iconClass: "speaker_notes",
				tooltip: "Jump to Notes section"
			},
			{
				domSelector: "#orderEvent",
				iconClass: "event",
				tooltip: "Jump to Events section"
			},
            {
				domSelector: "#orderBillingTable",
				iconClass: "attach_money",
				tooltip: "Jump to Billing Info section"
			},
			{
				domSelector: "#orderPayment",
				iconClass: "payment",
				tooltip: "Jump to Billing Payment section"
			},
            {
                domSelector: "#customerOrders",
                iconClass: "swap_horiz",
                tooltip: "Jump to Orders section"
            },
            {
				domSelector: "#storedItems",
				iconClass: "motorcycle",
				tooltip: "Jump to Inventory section"
			}
		];

        const self = this;
        const unbindOrderWatch = this._$scope.$watch(() => {
            return self.order ? self.order._id : null;
        }, () => {
            self.editOrder = null;

            if (self.order && self.order.assigned && self.order.assigned.agentId) {
                self._Agent.get(self.order.assigned.agentId)
                    .then(agent => {
                        self.order.assigned.agent = agent;
                    });
            }

            // for customer of selected order, we would like to get the stored inventories for readonly inventory view.
            if (self.order && self.order.customer) {
                self._Container.getCurrentlyStoredItemsForCustomer(self.order.customer).then((res) => {
                    self.customerInventory = res.data;
                });
            } else {
                self.customerInventory = [];
            }

            self.groupedInventories = self._Order.getSortedInventories(self.order);
        });
        this._$scope.$on('$destroy', () => {
            unbindOrderWatch();
        });
        
        // for customer of selected order, we would like to get the stored inventories for readonly inventory view.
        if (this.order && self.order.customer) {
            this._Container.getCurrentlyStoredItemsForCustomer(self.order.customer).then((res) => {
                this.customerInventory = res.data;
            });

            this._Container.getStorageUnitForCustomer(self.order.customer).then((res) => {
                this.customerSpace = res.data;
            });
        } else {
            this.customerInventories = [];
        }
    }

    // UI helper for disable / enable button
    isAllowedEdit() {
        return this.order !==null
            && this._OrdersValidationService.doesOrderHaveEditableDisposition(this.order);
    }

    // basic button event handling for toggling edit status.
    // _____________________________________________________________________________________
    edit() {
        if (this.order) {
            this.editOrder = _.cloneDeep(this.order);
        }
    }

    cancelEdit() {
        this.editOrder = null;
    }
    // _____________________________________________________________________________________


    save() {
        if (this.order.originationLocation.zipCode !== this.editOrder.originationLocation.zipCode) {
            var confirm = this._$mdDialog.confirm()
                .textContent('If you change zip code, it will update market, warehouse and agent. Are you sure you want to change?')
                .ok('Yes')
                .cancel('No');
            let self = this;
            this._$mdDialog.show(confirm).then(() => {
                this.saveOrder();
            });
        } else {
            this.saveOrder();
        }
    }

    // Again we are saving the order, we expect the backend to log the event.
    saveOrder() {
        if (!this.editOrder) return;

        let promises = [];
        const self = this;

        let orderObj = {
            "_id": this.order._id,
            "tasks": {
                "Customer Dropoff/Pickup": _.get(this.editOrder,"tasks['Customer Dropoff/Pickup']", false)
            },
            "originationLocation": {
                "address": _.get(this.editOrder, "originationLocation.address", ""),
                "zipCode": _.get(this.editOrder, "originationLocation.zipCode", "")
            },
            "terminalLocation": {
                "address": _.get(this.editOrder, "terminalLocation.address", "")
            },
            "requestedDate1": _.get(this.editOrder, "requestedDate1", null),
            "requestedDate2": _.get(this.editOrder, "requestedDate2", null),
            "requestedDate3": _.get(this.editOrder, "requestedDate3", null),
            "disposition": this._AppConstants.dispositions.updated
        };
        promises.push(this._Order.update(orderObj));

        let customerDiff = _.reduce(this.order.customer, function(result, value, key) {
            return _.isEqual(value, self.editOrder.customer[key]) ?
                result : result.concat(key);
        }, []);
        if (customerDiff && customerDiff.length > 0) {
            let customerObj = {_id: this.order.customer._id};
            _.forEach(customerDiff, (atom) => {
                customerObj[atom] = this.editOrder.customer[atom];
            })
            promises.push(this._Customer.update(customerObj));
        }

        Promise.all(promises)
            .then( ([order, customer]) => {
                _.each(order, (value, key) => {
                    self.order[key] = value;
                });
                if (customer) {
                    self.order.customer = customer;
                }
                self._AlertService.success("The order has successfully been updated.");
            })
            .catch(err => {
                self._AlertService.error("Failed to update");
            });
        this.editOrder = null;
    }

    close() {
        this.order = null;
    }

    hasError(elem) {
        return elem.$error && !_.isEmpty(elem.$error);
    }

    // UI helper
    openPhoneCallModal() {
		let self = this;
		this._$mdDialog.show({
			controller: 'PhoneActionModalController as  $ctrl',
			templateUrl: '../../../templates/shared/_phone_action_dialog.html',
			parent: angular.element(document.body),
			clickOutsideToClose: true,
			locals: {number: this.order.customer.mobile, order: this.order, _Service: this._Order}
		}).then((data) => {
			// after closing phone call modal
			self.order = data.data;
		});
	}

};

OrderDetailViewController.$inject = ['$scope', 'Order', 'Customer', 'Agent', 'Container', 'AppConstants', 'OrdersValidationService', '$mdDialog', 'AlertService'];

export default OrderDetailViewController;
