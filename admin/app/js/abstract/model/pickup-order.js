import BaseOrder from './base-order.js';
export default class PickupOrderModel extends BaseOrder {
    constructor() {
        super()
        this.goingToWarehouse=true;
    }
}
