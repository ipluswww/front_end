import OrdersValidationService from '../../../app/js/services/orders.validation.service.js';
import AppConstants from '../../../app/js/config/app.constants.js';
import PickupOrderModel from '../../../app/js/abstract/model/pickup-order.js';
import DeliveryOrderModel from '../../../app/js/abstract/model/delivery-order.js';
describe('OrdersValidationService', () => {
    let pickupOrder = new PickupOrderModel();
    let deliveryOrder = new DeliveryOrderModel();
    let service  = new OrdersValidationService(AppConstants);
    describe('hasExistingCustomer', () => {
        it('when order.customer._id is undefined, function returns null',()=>{
            expect(service.hasExistingCustomer(pickupOrder)).toBeFalsy();
        });
    });

    describe('doesOrderHaveEditableDisposition()', () => {
        describe('when disposition is undefined',()=>{
            it('returns true',()=>{
                delete deliveryOrder.disposition;
                expect(service.doesOrderHaveEditableDisposition(deliveryOrder)).toBeTruthy();
            });
        });
        describe('when disposition is empty string',()=>{
            it('returns true',()=>{
                deliveryOrder.disposition = "";
                expect(service.doesOrderHaveEditableDisposition(deliveryOrder)).toBeTruthy();
            });
        });
        describe('when disposition is null',()=>{
            it('returns true',()=>{
                deliveryOrder.disposition = null;
                expect(service.doesOrderHaveEditableDisposition(deliveryOrder)).toBeTruthy();
            });
        });
        describe('when disposition is prospect',()=>{
            it('returns true',()=>{
                deliveryOrder.disposition = AppConstants.dispositions.prospect;
                expect(service.doesOrderHaveEditableDisposition(deliveryOrder)).toBeTruthy();
            });
        });
        describe('when disposition is created',()=>{
            it('returns true',()=>{
                deliveryOrder.disposition = AppConstants.dispositions.created;
                expect(service.doesOrderHaveEditableDisposition(deliveryOrder)).toBeTruthy();
            });
        });
        describe('when disposition is accepted',()=>{
            it('returns true',()=>{
                deliveryOrder.disposition = AppConstants.dispositions.accepted;
                expect(service.doesOrderHaveEditableDisposition(deliveryOrder)).toBeTruthy();
            });
        });
        describe('when disposition is updated',()=>{
            it('returns true',()=>{
                deliveryOrder.disposition = AppConstants.dispositions.updated;
                expect(service.doesOrderHaveEditableDisposition(deliveryOrder)).toBeTruthy();
            });
        });
        describe('when disposition is payment hold',()=>{
            it('returns true',()=>{
                deliveryOrder.disposition = AppConstants.dispositions.paymetHold;
                expect(service.doesOrderHaveEditableDisposition(deliveryOrder)).toBeTruthy();
            });
        });
        describe('when disposition is aged',()=>{
            it('returns false',()=>{
                deliveryOrder.disposition = AppConstants.dispositions.aged;
                expect(service.doesOrderHaveEditableDisposition(deliveryOrder)).toBeFalsy();
            });
        });
        describe('when disposition is closed',()=>{
            it('returns false',()=>{
                deliveryOrder.disposition = AppConstants.dispositions.closed;
                expect(service.doesOrderHaveEditableDisposition(deliveryOrder)).toBeFalsy();
            });
        });
        describe('when disposition is cancelled',()=>{
            it('returns false',()=>{
                deliveryOrder.disposition = AppConstants.dispositions.cancelled;
                expect(service.doesOrderHaveEditableDisposition(deliveryOrder)).toBeFalsy();
            });
        });
        describe('when disposition is completed',()=>{
            it('returns false',()=>{
                deliveryOrder.disposition = AppConstants.dispositions.completed;
                expect(service.doesOrderHaveEditableDisposition(deliveryOrder)).toBeFalsy();
            });
        });
        describe('when disposition is in transit',()=>{
            it('returns false',()=>{
                deliveryOrder.disposition = AppConstants.dispositions.inTransit;
                expect(service.doesOrderHaveEditableDisposition(deliveryOrder)).toBeFalsy();
            });
        });
        describe('when disposition is late',()=>{
            it('returns false',()=>{
                deliveryOrder.disposition = AppConstants.dispositions.late;
                expect(service.doesOrderHaveEditableDisposition(deliveryOrder)).toBeFalsy();
            });
        });
        describe('when disposition is closed',()=>{
            it('returns false',()=>{
                deliveryOrder.disposition = AppConstants.dispositions.closed;
                expect(service.doesOrderHaveEditableDisposition(deliveryOrder)).toBeFalsy();
            });
        });
        describe('when disposition is reconciled',()=>{
            it('returns true',()=>{
                deliveryOrder.disposition = AppConstants.dispositions.reconciled;
                expect(service.doesOrderHaveEditableDisposition(deliveryOrder)).toBeFalsy();
            });
        });
        describe('when disposition is requested',()=>{
            it('returns true',()=>{
                deliveryOrder.disposition = AppConstants.dispositions.requested;
                expect(service.doesOrderHaveEditableDisposition(deliveryOrder)).toBeTruthy();
            });
        });
    });

    describe('getOrderType', () => {
        it('when goingToWarehouse is false, type is delivery',()=>{
            expect(service.getOrderType(deliveryOrder)).toEqual('delivery');
        });
        it('when goingToWarehouse is true, type is delivery',()=>{
            expect(service.getOrderType(pickupOrder)).toEqual('pickup');
        });
    });

    describe('isSpacePrice()', () => {
        describe('when spacePrice is true',()=>{
            it('returns true',()=>{
                deliveryOrder.spacePrice =true;
                expect(service.isSpacePrice(deliveryOrder)).toBeTruthy();
            });
        });
        describe('when spacePrice is false',()=>{
            it('returns false',()=>{
                deliveryOrder.spacePrice =false;
                expect(service.isSpacePrice(deliveryOrder)).toBeFalsy();
            });
        });
    });

    describe('isItemPrice()', () => {
        describe('when spacePrice is true',()=>{
            it('returns false',()=>{
                deliveryOrder.spacePrice =true;
                expect(service.isItemPrice(deliveryOrder)).toBeFalsy();
            });
        });
        describe('when spacePrice is false',()=>{
            it('returns false',()=>{
                deliveryOrder.spacePrice =false;
                expect(service.isItemPrice(deliveryOrder)).toBeTruthy();
            });
        });
    });

    describe('isEligibleForDisposition()', ()=>{
        describe('when To Dispisition is in allowableDispositions', ()=>{
            it('returns true', ()=>{
                pickupOrder.allowableDispositions = [AppConstants.dispositions.created];
                expect(service.isEligibleForDisposition(pickupOrder,
                    AppConstants.dispositions.created)).toBeTruthy();
            })
        });
        describe('when To Dispisition is not in allowableDispositions', ()=>{
            it('returns false', ()=>{
                pickupOrder.allowableDispositions = [AppConstants.dispositions.requested];
                expect(service.isEligibleForDisposition(pickupOrder,
                    AppConstants.dispositions.created)).toBeFalsy();
            })
        });
    });

    describe('hasManuallySelectedPrice()', ()=>{
        describe('when order.hasManuallySelectedPrice is undefined', ()=>{
            it('returns false',()=>{
                delete pickupOrder.hasManuallySelectedPrice;
                expect(service.hasManuallySelectedPrice(pickupOrder)).toBeFalsy();
            });
        });
        describe('when order.hasManuallySelectedPrice is null', ()=>{
            it('returns false',()=>{
                pickupOrder.hasManuallySelectedPrice= null;
                expect(service.hasManuallySelectedPrice(pickupOrder)).toBeFalsy();
            });
        });
        describe('when order.hasManuallySelectedPrice is false', ()=>{
            it('returns false',()=>{
                pickupOrder.hasManuallySelectedPrice = false;
                expect(service.hasManuallySelectedPrice(pickupOrder)).toBeFalsy();
            });
        });
        describe('when order.hasManuallySelectedPrice is true', ()=>{
            it('returns false',()=>{
                pickupOrder.hasManuallySelectedPrice = true;
                expect(service.hasManuallySelectedPrice(pickupOrder)).toBeTruthy();
            });
        });
    });
    describe('hasMetMinimumInventoryRequirements',()=>{
        describe('when spacePrice is true',()=>{
            beforeEach(()=>{
                service.isSpacePrice = ()=>{ return true};
            });
            describe('and order inventory has one item', ()=>{
                beforeEach(()=>{
                    pickupOrder.inventory.push({_id:'BLAH'});
                });
                it('returns true',()=>{
                    expect(service.hasMetMinimumInventoryRequirements(pickupOrder)).toBeTruthy();
                })
            });
            describe('and order inventory has zero items', ()=>{
                beforeEach(()=>{
                    pickupOrder.inventory=[];
                });
                it('returns true',()=>{
                    expect(service.hasMetMinimumInventoryRequirements(pickupOrder)).toBeTruthy();
                })
            });
        });
        describe('when spacePrice is false',()=>{
            beforeEach(()=>{
                service.isSpacePrice = ()=>{ return false};
            });
            describe('and order inventory has one item', ()=>{
                beforeEach(()=>{
                    pickupOrder.inventory.push({_id:'BLAH'});
                });
                it('returns true',()=>{
                    expect(service.hasMetMinimumInventoryRequirements(pickupOrder)).toBeTruthy();
                })
            });
            describe('and order inventory has zero items', ()=>{
                beforeEach(()=>{
                    pickupOrder.inventory=[];
                });
                it('returns true',()=>{
                    expect(service.hasMetMinimumInventoryRequirements(pickupOrder)).toBeFalsy();
                })
            });
        });
    });
});
