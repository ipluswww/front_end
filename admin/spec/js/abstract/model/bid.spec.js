import PickupOrder from '../../../../app/js/abstract/model/pickup-order.js';
import Bid from '../../../../app/js/abstract/model/bid.js';


describe('Bid', () => {
    let order, isSpacePrice;
    beforeEach(()=> {
        order = new PickupOrder();
    });
    describe('constructor()', ()=>{
        describe('customer',()=>{
            it('customer on bid is the same', ()=>{
                order.customer = {_id:'123'};
                expect(new Bid(order, isSpacePrice).customer).toEqual(order.customer._id);
            });
        });

        describe('market',()=>{
            it('market on bid is the order.market._id', ()=>{
                order.market = [{_id:'123'}];
                expect(new Bid(order, isSpacePrice).market).toEqual(order.market._id);
            });
        });
        describe('customerValuation',()=>{
            it('containers on bid is the same', ()=>{
                order.customerValuation = 123;
                expect(new Bid(order, isSpacePrice).customerValuation).toEqual(order.customerValuation);
            });
        });
        describe('discountCode',()=>{
            it('discountCode on bid is the same', ()=>{
                order.discountCode = {_id:'123'};
                expect(new Bid(order, isSpacePrice).discountCode).toEqual(order.discountCode);
            });
        });
        describe('containers', ()=>{
            describe('when isSpacePrice is true', ()=>{
                beforeEach(()=>{
                    order.storageUnit = {_id:'123', subType:{_id:'ABC', name:'HEY-O!'}};
                    isSpacePrice = true;
                });
                it('containers has one item in array', ()=>{
                    expect(new Bid(order, isSpacePrice).containers.length).toEqual(1);
                });
                it('and the one item has a subType that equals the _id of the subType of the storageUnit on the order', ()=>{
                    expect(new Bid(order, isSpacePrice).containers[0].subType).toEqual(order.storageUnit.subType._id);
                });
            });
            describe('when order is spacePrice is false', ()=>{
                beforeEach(()=>{
                    isSpacePrice = false;
                });
                describe('and the order is a pickup', ()=>{
                    beforeEach(()=>{
                        order.goingToWarehouse = true;
                    });
                    describe('and inventory has two items in the array',()=>{
                        beforeEach(()=>{
                            order.inventory.push({_id:'123', subType:{_id:'ABC', name:'HEY-O!'}});
                            order.inventory.push({_id:'789', subType:{_id:'XYZ', name:'HEY-YAH!'}});
                        });
                        it('containers has two items in array', ()=>{
                            expect(new Bid(order, isSpacePrice).containers.length).toEqual(2);
                        });
                        it('and each item has a subType that equals the _id of the subType of the storageUnit on the order', ()=>{
                            expect(new Bid(order, isSpacePrice).containers[0].subType).toEqual(order.inventory[0].subType._id);
                            expect(new Bid(order, isSpacePrice).containers[1].subType).toEqual(order.inventory[1].subType._id);
                        });
                    });
                });
                describe('and the order is not a pickup', ()=>{
                    beforeEach(()=>{
                        order.goingToWarehouse = false;
                    });
                    describe('and inventory has two items in the array',()=>{
                        beforeEach(()=>{
                            order.inventory.push({_id:'123', subType:{_id:'ABC', name:'HEY-O!'}});
                            order.inventory.push({_id:'789', subType:{_id:'XYZ', name:'HEY-YAH!'}});
                        });
                        it('containers has no items in array', ()=>{
                            expect(new Bid(order, isSpacePrice).containers.length).toEqual(0);
                        });
                        it('removeContainers has two items in array', ()=>{
                            expect(new Bid(order, isSpacePrice).removeContainers.length).toEqual(2);
                        });
                        it('and each item has a _id that equals the _id of the inventory on the order', ()=>{
                            expect(new Bid(order, isSpacePrice).removeContainers[0]._id).toEqual(order.inventory[0]._id);
                            expect(new Bid(order, isSpacePrice).removeContainers[1]._id).toEqual(order.inventory[1]._id);
                        });
                    });
                });
            });
        });
    });
});