import _ from 'lodash';
export default class OrderParameterAdditionsController {
    constructor(Parameter){
        this._Parameter = Parameter;
        this.maxAddOns=1;
        this.requireMatch = true;
        this.query  = {
			sort: "name",
			limit: 10,
			page: 1,
			skip: 0,
			search: null
		};
    }

    querySearch () {
        return this._Parameter.list(this.query).then((response)=>{
            let parameters = _.map(response.data, (parameter) => {
                return parameter;
            }, []);

            return parameters;
        });
    }
    canAddMoreAddOns() {
        return !this.isLocked && this.order.options.length < this.maxAddOns;
    }
    transformChip(chip) {
        if (this.order.options.length >= this.maxAddOns || typeof chip !== 'object') {
            return null;
        }
        return chip;
    }
}
OrderParameterAdditionsController.$inject = ['Parameter'];
