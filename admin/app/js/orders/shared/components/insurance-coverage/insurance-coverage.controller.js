export default class InsuranceCoverageController {
	constructor () {
	}

	getCumulativeCustomerValuation() {
		let currentValuation = 0;
		if(this.order.customer.customerValuation){
			currentValuation = this.order.customer.customerValuation;
		}
		return currentValuation;
	}

	getMarketCoverageCost() {
		return this.getCumulativeCustomerValuation() * this.order.market.insuranceFactor;
	}

}
