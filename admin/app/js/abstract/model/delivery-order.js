import BaseOrder from './base-order.js';
export default class DeliveryOrderModel extends BaseOrder {
 constructor() {
  super();
  this.goingToWarehouse = false;
 }
}