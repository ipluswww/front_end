import PickupOrder from '../../../app/js/abstract/model/pickup-order.js';
import DeliveryOrder from '../../../app/js/abstract/model/delivery-order.js';
import StoredInventoryService from '../../../app/js/services/stored-inventory.service.js';
import OrdersValidationService from '../../../app/js/services/orders.validation.service.js';

describe('OrdersValidationService', () => {
    let validationService, service, order, currentlyStoredInventory;
    beforeEach(()=>{
        validationService = jasmine.createSpyObj('OrdersValidationService',
            ['isPickup']);
        service = new StoredInventoryService(validationService);
        currentlyStoredInventory = [];
    });
    describe('adjustInventoryBasedOnItemQuantityChanged', ()=>{
        let item1 = {contents:'ABC', label:'xyz', subType:{_id:'123'}};
        let item2 = {contents:'ABC', label:'xyz', subType:{_id:'123'}};
        let item3 = {contents:'ABC', label:'xyz', subType:{_id:'123'}};
        let order = new PickupOrder();
        let event = {};
        describe('when grouped item is increased from 2 to 3',()=>{
            it('order inventory is increased to 3', ()=>{
                order.inventory = [item1,item2];
                event.groupedItem = item3;
                event.groupedItem.qty = 3
                service.adjustInventoryBasedOnItemQuantityChanged(event, order);
                expect(order.inventory.length).toEqual(3);
            });
        });
        describe('when grouped item is decreased from 3 to 2',()=>{
            it('order inventory is decreased to 2', ()=>{
                order.inventory = [item1,item2];
                event.groupedItem = item3;
                event.groupedItem.qty = 1
                service.adjustInventoryBasedOnItemQuantityChanged(event, order);
                expect(order.inventory.length).toEqual(1);
            });
        });
    });
    describe('getGroupedInventoryBySubTypeContentLabel()',()=>{
        describe('when passing two items with the same contents, label, and subType', ()=>{
            it('should return one item with a qty of 2',()=>{
                let item1 = {contents:'ABC', label:'xyz', subType:{_id:'123'}};
                let item2 = {contents:'ABC', label:'xyz', subType:{_id:'123'}};
                let inventory = [
                    item1, item2
                ];
                let groupedInventory = service.getGroupedInventoryBySubTypeContentLabel(inventory);
                expect(groupedInventory.length).toEqual(1);
                expect(groupedInventory[0].qty).toEqual(2);
            });
        });
        describe('when passing two items with the same contents, label, but different subType', ()=>{
            it('should return two items each with a qty of 1',()=>{
                let item1 = {contents:'ABC', label:'xyz', subType:{_id:'123'}};
                let item2 = {contents:'ABC', label:'xyz', subType:{_id:'234'}};
                let inventory = [
                    item1, item2
                ];
                let groupedInventory = service.getGroupedInventoryBySubTypeContentLabel(inventory);
                expect(groupedInventory.length).toEqual(2);
                expect(groupedInventory[0].qty).toEqual(1);
                expect(groupedInventory[1].qty).toEqual(1);
            });
        });
        describe('when passing two items with the same contents, subType, but different label', ()=>{
            it('should return two items each with a qty of 1',()=>{
                let item1 = {contents:'ABC', label:'xyz', subType:{_id:'123'}};
                let item2 = {contents:'ABC', label:'zyx', subType:{_id:'123'}};
                let inventory = [
                    item1, item2
                ];
                let groupedInventory = service.getGroupedInventoryBySubTypeContentLabel(inventory);
                expect(groupedInventory.length).toEqual(2);
                expect(groupedInventory[0].qty).toEqual(1);
                expect(groupedInventory[1].qty).toEqual(1);
            });
        });
        describe('when passing two items with the same label, subType, but different contents', ()=>{
            it('should return two items each with a qty of 1',()=>{
                let item1 = {contents:'ABC', label:'xyz', subType:{_id:'123'}};
                let item2 = {contents:'CBA', label:'zyx', subType:{_id:'123'}};
                let inventory = [
                    item1, item2
                ];
                let groupedInventory = service.getGroupedInventoryBySubTypeContentLabel(inventory);
                expect(groupedInventory.length).toEqual(2);
                expect(groupedInventory[0].qty).toEqual(1);
                expect(groupedInventory[1].qty).toEqual(1);
            });
        });
    });
    describe('getTotalInventory()', ()=>{
        describe('when currentlyStoredInventory is empty', ()=>{
            describe('and OrdersValidationService.isPickup is true', ()=>{
                beforeEach(()=>{
                    validationService.isPickup.and.returnValue(true);
                    order = new PickupOrder();
                });
                describe('and order.inventory is empty', ()=>{
                    it('returns empty array', ()=>{
                        let totalItems = service.getTotalInventory(order,currentlyStoredInventory);
                        expect(totalItems.length).toEqual(0);
                    });
                });
                describe('and order.inventory has one item', ()=>{
                    beforeEach(()=>{
                        order.inventory.push({_id:'XYZ'});
                    });
                    it('returns array of 1', ()=>{
                        let totalItems = service.getTotalInventory(order,currentlyStoredInventory);
                        expect(totalItems.length).toEqual(1);
                    });
                });
            });
            describe('and OrdersValidationService.isPickup is false', ()=>{
                beforeEach(()=>{
                    validationService.isPickup.and.returnValue(false);
                    order = new DeliveryOrder();
                });
                describe('and order.inventory is empty', ()=>{
                    it('returns empty array', ()=>{
                        let totalItems = service.getTotalInventory(order,currentlyStoredInventory);
                        expect(totalItems.length).toEqual(0);
                    });
                });
                describe('and order.inventory has one item', ()=>{
                    beforeEach(()=>{
                        order.inventory.push({_id:'XYZ'});
                    });
                    it('returns array of 0', ()=>{
                        let totalItems = service.getTotalInventory(order,currentlyStoredInventory);
                        expect(totalItems.length).toEqual(0);
                    });
                });
            });
        });
        describe('when currentlyStoredInventory contains two items', ()=>{
            beforeEach(()=>{
                currentlyStoredInventory= [{_id:'ABC'}, {_id:'XYZ'}];
            });
            describe('and OrdersValidationService.isPickup is true', ()=>{
                beforeEach(()=>{
                    validationService.isPickup.and.returnValue(true);
                    order = new PickupOrder();
                });
                describe('and order.inventory is empty', ()=>{
                    it('returns array of 2 items', ()=>{
                        let totalItems = service.getTotalInventory(order,currentlyStoredInventory);
                        expect(totalItems.length).toEqual(2);
                    });
                });
                describe('and order.inventory has one item that is not in currentlyStoredInventory', ()=>{
                    beforeEach(()=>{
                        order.inventory.push({_id:'XXX'});
                    });
                    it('returns array of 3', ()=>{
                        let totalItems = service.getTotalInventory(order,currentlyStoredInventory);
                        expect(totalItems.length).toEqual(3);
                    });
                });
                describe('and order.inventory has one item that is in currentlyStoredInventory', ()=>{
                    beforeEach(()=>{
                        order.inventory.push({_id:'XYZ'});
                    });
                    it('returns array of 3', ()=>{
                        let totalItems = service.getTotalInventory(order,currentlyStoredInventory);
                        expect(totalItems.length).toEqual(3);
                    });
                });
            });
            describe('and OrdersValidationService.isPickup is false', ()=>{
                beforeEach(()=>{
                    validationService.isPickup.and.returnValue(false);
                    order = new DeliveryOrder();
                });
                describe('and order.inventory is empty', ()=>{
                    it('returns array of 2', ()=>{
                        let totalItems = service.getTotalInventory(order,currentlyStoredInventory);
                        expect(totalItems.length).toEqual(2);
                    });
                });
                describe('and order.inventory has one item that is not in currentlyStoredInventory', ()=>{
                    beforeEach(()=>{
                        order.inventory.push({_id:'XXX'});
                    });
                    it('returns array of 2', ()=>{
                        let totalItems = service.getTotalInventory(order,currentlyStoredInventory);
                        expect(totalItems.length).toEqual(2);
                    });
                });
                describe('and order.inventory has one item that is in currentlyStoredInventory', ()=>{
                    beforeEach(()=>{
                        order.inventory.push({_id:'XYZ'});
                    });
                    it('returns array of 1', ()=>{
                        let totalItems = service.getTotalInventory(order,currentlyStoredInventory);
                        expect(totalItems.length).toEqual(1);
                    });
                });
            });
        });
    });
});
