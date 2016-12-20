class AdditionalInsuranceController {
	constructor (){
		this.customerValuation=0;
    }

	$onChanges(changes){
		this.customerValuation = changes.order.currentValue.customer.customerValuation;
	}

	changeCustomerValuation(){
		this.onCustomerValuationUpdated({$event: { customerValuation: this.customerValuation}});
	}

}

AdditionalInsuranceController.$inject = [];
export default AdditionalInsuranceController;
