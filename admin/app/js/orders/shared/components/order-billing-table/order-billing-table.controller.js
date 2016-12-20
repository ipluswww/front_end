import _ from 'lodash';
import moment from 'moment';

class OrderBillingTableController {
    constructor($scope, Transaction) {
        this._$scope = $scope;
        this._Transaction = Transaction;
        this.init();
    }

    init() {
        self = this;
        const unbindOrderWatch = this._$scope.$watch(() => {
            return self.order ? self.order._id : null;
        }, () => {
            if (self.order && self.order.customer && self.order.customer._id) {
                self._Transaction.getTransactionsForCustomer(self.order.customer._id)
                    .then(res => {
                        self.order.customer.transactions = res;
                    });
            }
        });
        this._$scope.$on('$destroy', () => {
            unbindOrderWatch();
        });
    }

    displayBillingStatus(item) {
        return _.upperFirst(_.lowerCase(item.status));
    }

    getInsuranceAmount() {
        if (this.order) {
            return _.get(this.order, "customerValuation", 0);
        }
        return 0;
    }

    getInsuranceCost() {
        if (this.order) {
            return this.getInsuranceAmount() * _.get(this.order, "market.insuranceFactor", 0);
        }
        return 0;
    }

    getTotalSubscription() {
        if (this.order) {
            return this.getInsuranceCost() + _.get(this.order, "customer.subscription.balance", 0);
        }
        return 0;
    }
};

OrderBillingTableController.$inject = ['$scope', 'Transaction'];

export default OrderBillingTableController;
