export default class ItemPriceDisplayController {
    constructor() {

    }

    getDiscount() {
        let result = "";
        if (this.isFinal && this.order.discount) {
            if (this.order.discount.type === "PERCENT") {
                result = ` - ${parseInt(this.order.discount.discountPercent * 100)}% ${this.order.discount.code} Discount`;
            } else if (this.order.discount.type === "FIXED") {
                price = price - this.order.discount.fixedPrice;
                result = ` - $${this.order.discount.fixedPrice} ${this.order.discount.code} Discount`;
            }
        }
        return result;
    }

    getPickup() {
        let result = "";
        if (!this.order.tasks['Customer Dropoff/Pickup']) {
            result = `Pick Up Fee: $${this.order.itemPriceSelection.price.toFixed(2)}`;
        }
        return result;
    }

    getOneTime() {
        let results = [];
        if (this.order.discount) {
            if (this.order.discount.type === "FIRST_MONTH_FIXED") {
                results.push(`$${this.order.discount.fixedPrice} discount`);
            } else if (this.order.discount.type === "FIRST_MONTH_FREE") {
                results.push("FREE discount");
            }
        }
        if (this.order.options) {
            this.order.options.forEach(option => {
                results.push(`${option.name} $${option.value}`);
            });
        }

        return results.length ? "One-time: " + results.join(", ") : "";
    }
}
