import _ from 'lodash';

class CustomerEmailLookupController {
    constructor(Customer, Order, $mdDialog, OrdersValidationService){
        this.isInEdit = false;
        this._Order = Order;
        this._Customer = Customer;
        this._$mdDialog = $mdDialog;
        this._OrdersValidationService = OrdersValidationService;
        this.query  = {
			sort: 'email',
			limit: 10,
			page: 1,
			skip: 0,
			search: ''
		};
    }

    querySearch (query) {
        return this._Customer.list(query)
            .then(response => this.searchResults = response.data);
    }

    customerEmailExists () {
        return !_.every(this.searchResults, (customer) => {
            return customer.email !== this.query.search;
        });
    }

    doesEmailMatchQuerySearch(){
        return this.order.customer.email === this.query.search;
    }

    finalizeIsDisabled () {
        const isValidEmail = this._OrdersValidationService.isValidEmail(this.query.search);
        const isNonSelectedExistingCustomer = !_.get(this.order, 'customer._id') && this.customerEmailExists();
        return !isValidEmail || isNonSelectedExistingCustomer;
    }

    finalizeChange() {
        if (this.finalizeIsDisabled()) return;
        const isNewCustomer = !this.order.customer || !this.order.customer._id || !this.doesEmailMatchQuerySearch();
        const customer = isNewCustomer ? { email: this.query.search } : this.order.customer;
        this.onCustomerUpdated({ $event: { newCustomer: customer, previousCustomer: this.originalCustomer } });
        this.isInEdit = false;
    }

    selectedItemChange(customer) {
        this.order.customer = customer;
    }

    cancelChange() {
        this.order.customer = _.cloneDeep(this.originalCustomer);
        this.isInEdit = false;
    }

    isLockedOrIsInEdit() {
        return this.isLocked || this.isInEdit;
    }

    startEdit() {
        if (this.isLockedOrIsInEdit()) return;
        this.originalCustomer = _.cloneDeep(this.order.customer);
        this.isInEdit = true;
    }
}

CustomerEmailLookupController.$inject = ['Customer', 'Order', '$mdDialog', 'OrdersValidationService'];

export default CustomerEmailLookupController;
