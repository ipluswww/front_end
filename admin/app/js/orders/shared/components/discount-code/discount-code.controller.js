import _ from 'lodash';
export default class DiscountCodeController {
    constructor(Discount){
        this._Discount = Discount;
        this.discounts=[];
        this.maxDiscounts=1;
        this.requireMatch = true;
        this.query  = {
			sort: "code",
			limit: 10,
			page: 1,
			skip: 0,
			search: null
		};
        this.init();
    }

    init() {
        if (this.order.discountCode) {
            this._Discount.getByCode(this.order.discountCode).then((response) => {
                this.setDiscountFields(response);
            });
        }
        else if (this.order.customer.discountsApplied && this.order.customer.discountsApplied.length > 0) {
            this._Discount.getByCode(this.order.customer.discountsApplied[0]).then((response) => {
                this.setDiscountFields(response);
            });
        }
    }

    querySearch () {
        return this._Discount.list(this.query).then((response)=>{
            let codes = _.map(response.data, (code) => {
                return code;
            }, []);

            return codes;
        });
    }

    canAddMoreDiscounts() {
        return !this.isLocked && this.discounts.length < this.maxDiscounts;
    }

    transformChip(chip) {
        if (typeof chip !== 'object' || this.discounts.length >= this.maxDiscounts) {
            return null;
        }
        this.setDiscountFields(chip);
        return chip;
    }

    setDiscountFields(discount){
        this.discounts.push(discount);
        this.onDiscountChanged({$event:{discount:discount}});
    }

    removeDiscount(chip) {
        this.onDiscountChanged({$event:{discount:null}});
    }
}
DiscountCodeController.$inject = ['Discount'];
