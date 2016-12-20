import angular from 'angular';
import _ from 'lodash';

class Transaction {
  constructor(AppConstants, $http, $q) {
    this.baseAPIURL = AppConstants.api;
    this._$http = $http;
    this._$q = $q;
  }

  getTransactionsForCustomer(customerId) {
    return this._$http({
      url: this.baseAPIURL + '/customers/' + customerId + '/transactions',
      method: 'GET'
    }).then(
      // On success...
      (res) => {
        return res.data;
      },
      (err)=>{
        return err.data;
      }
    );
  }

  createTransactionForCustomer(customerId, object) {
    return this._$http({
      url: this.baseAPIURL + '/customers/' + customerId + '/transactions',
      method: 'POST',
      data: object
    }).then(
      // On success...
      (res) => {
        return res.data;
      },
      (err)=>{
        return err.data;
      }
    );
  }

}

Transaction.$inject = ['AppConstants', '$http', '$q'];
export default Transaction;
