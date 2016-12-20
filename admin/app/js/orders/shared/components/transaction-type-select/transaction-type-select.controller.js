import _ from 'lodash';
class TransactionTypeSelectController {
	constructor(BraintreeTransType) {
		this._BraintreeTransType = BraintreeTransType;
		this.init();
	}


	init () {
		const self = this;
		const query = {
			limit: 0,
			page: 0
		};
		this._BraintreeTransType.list(query).then(res => {
			self.transtypes = res.data;
			if (self.transtypes.length) {
				self.ngModel = self.ngModel || self.transtypes[0].memo;
			}
		});
	}
}

TransactionTypeSelectController.inject = ['BraintreeTransType'];

export default TransactionTypeSelectController;
