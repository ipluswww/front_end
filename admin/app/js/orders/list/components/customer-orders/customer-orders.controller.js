import _ from 'lodash';
class CustomerOrdersController {
    constructor($scope, $state, Order, OrdersValidationService) {
        this._$scope = $scope;
        this._$state = $state;
        this._Order = Order;
        this._OrdersValidationService = OrdersValidationService;
        this.init();
    }

    init() {
        const self = this;

        const unbindCustomerWatch = this._$scope.$watch(() => {
            return self.customer ? self.customer._id : null;
        }, (customerId) => {
            self.orders = [];
            if (customerId) {
                const filter = {
                    "customer._id": customerId
                };
                if (self.except) {
                    filter.id = {$ne: self.except};
                }

                const q = {
                    page: 1,
                    limit: 5,
                    sort: '-dateCreated'
                };
                self._Order.list(q, filter).then(res => {
                    self.orders = res.data;
                });
            }
        });
        this._$scope.$on('$destroy', () => {
            unbindCustomerWatch();
        });
    }

    goToOrder(item) {
        if (this._OrdersValidationService.isPickup(item)) {
            this._$state.go("app.orders.pickup.detail", {id: item._id});
        } else {
            this._$state.go("app.orders.delivery.detail", {id: item._id, customerId: this.customer._id});
        }
    }


};

CustomerOrdersController.$inject = ['$scope', '$state', 'Order', 'OrdersValidationService'];

export default CustomerOrdersController;
