export default class Bid {
 constructor(order, isSpacePrice) {
  this.customer = order.customer._id;
  this.market = order.market._id;
  this.containers = order.inventory;
  this.discountCode = order.discountCode;
  this.customerValuation = order.customerValuation;
  this.containers = [];
  this.removeContainers = [];
  if (isSpacePrice) {
   this.containers.push({
    subType: order.storageUnit.subType._id
   });
  } else {
   if (order.goingToWarehouse) {
    order.inventory.forEach((container) => {
     this.containers.push({
      subType: container.subType._id
     });
    });
   } else {
    order.inventory.forEach((container) => {
     this.removeContainers.push({
      _id: container._id
     });
    });
   }
  }
 }
}