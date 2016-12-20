import OrdersValidationService from '../../../app/js/services/orders.validation.service.js';
import OrdersAddressService from '../../../app/js/services/orders.address.service.js';
import PickupOrderModel from '../../../app/js/abstract/model/pickup-order.js';
import DeliveryOrderModel from '../../../app/js/abstract/model/delivery-order.js';
import Location from '../../../app/js/abstract/model/location.js';
import AppConstants from '../../../app/js/config/app.constants.js';

describe('OrdersAddressService', () => {
    let ordersValidationService  = new OrdersValidationService(AppConstants);
    let service  = new OrdersAddressService(ordersValidationService);
    let deliveryOrder, pickupOrder;
    let customerLocation,  warehouseLocation;
    beforeEach(()=>{
        let customerLocation = new Location();
        customerLocation.address = '123 customer street';
        customerLocation.zipCode = 12345;
        let warehouseLocation = new Location();
        warehouseLocation.address = '123 warehouse street';
        warehouseLocation.zipCode = 54321;
        deliveryOrder = new DeliveryOrderModel();
        pickupOrder  = new PickupOrderModel();
        deliveryOrder.originationLocation = warehouseLocation;
        deliveryOrder.terminalLocation = customerLocation;
        pickupOrder.originationLocation = customerLocation;
        pickupOrder.terminalLocation = warehouseLocation;
    });

    describe('copyAddressForCustomerItemsToCustomer()', ()=>{
        describe('when order is delivery',()=>{
            it('customer.location is equal to originationLocation',()=>{
                pickupOrder.originationLocation = customerLocation;
                service.copyAddressForCustomerItemsToCustomer(pickupOrder);
                expect(pickupOrder.customer.location)
                    .toEqual(pickupOrder.originationLocation);
            });
        });
        describe('when order is pickup',()=>{
            it('customer.location is equal to terminalLocation',()=>{
                deliveryOrder.terminalLocation = customerLocation;
                service.copyAddressForCustomerItemsToCustomer(deliveryOrder);
                expect(deliveryOrder.customer.location)
                    .toEqual(deliveryOrder.terminalLocation);
            });
        });
    });

    describe('getAddressForCustomerItems', () => {
        it('originationLocation is returned',()=>{
            expect(service.getAddressForCustomerItems(pickupOrder))
                .toEqual(pickupOrder.originationLocation);
        });
        it('when order is delivery, terminalLocation is returned',()=>{
            expect(service.getAddressForCustomerItems(deliveryOrder))
                .toEqual(deliveryOrder.terminalLocation);
        });
    });
    describe('getZipCodeForCustomerItems', () => {
        describe('when order is pickup', () => {
            describe('and originationLocation is defined', () => {
                it('originationLocation.zipCode is returned',()=>{
                    expect(service.getZipCodeForCustomerItems(pickupOrder))
                        .toEqual(pickupOrder.originationLocation.zipCode);
                });
            });
            describe('and originationLocation is not defined', () => {
                it('null is returned',()=>{
                    delete pickupOrder.originationLocation;
                    expect(service.getZipCodeForCustomerItems(pickupOrder))
                        .toBeNull();
                });
            });
        });
        describe('when order is delivery', () => {
            describe('and terminalLocation is defined', () => {
                it('terminalLocation.zipCode is returned',()=>{
                    expect(service.getZipCodeForCustomerItems(deliveryOrder))
                        .toEqual(deliveryOrder.terminalLocation.zipCode);
                });
            });
            describe('and terminalLocation is not defined', () => {
                it('null is returned',()=>{
                    delete deliveryOrder.terminalLocation;
                    console.log('deliveryOrder', deliveryOrder.terminalLocation);
                    expect(service.getZipCodeForCustomerItems(deliveryOrder))
                        .toBeNull();
                });
            });
        });
    });
    describe('hasAddressForCustomerItems', () => {
        describe('when order is pickup', () => {
            describe('and originationLocation is defined', () => {
                it('true is returned',()=>{
                    expect(service.hasAddressForCustomerItems(pickupOrder))
                        .toBeTruthy();
                });
            });
            describe('and originationLocation is not defined', () => {
                it('false is returned',()=>{
                    delete pickupOrder.originationLocation;
                    expect(service.hasAddressForCustomerItems(pickupOrder))
                        .toBeFalsy();
                });
            });
        });
        describe('when order is delivery', () => {
            describe('and terminalLocation is defined', () => {
                it('terminalLocation.zipCode is returned',()=>{
                    expect(service.hasAddressForCustomerItems(deliveryOrder))
                        .toBeTruthy();
                });
            });
            describe('and originationLocation is not defined', () => {
                it('undefined is returned',()=>{
                    delete deliveryOrder.terminalLocation;
                    expect(service.hasAddressForCustomerItems(deliveryOrder))
                        .toBeFalsy();
                });
            });
        });
    });
    describe('hasZipCodeForCustomerItems', () => {
        describe('when order is pickup', () => {
            describe('and originationLocation is defined', () => {
                describe('and zipcode is defined', () => {
                    describe('and zipcode is an empty string', () => {
                        it('false is returned',()=>{
                            pickupOrder.originationLocation.zipCode="";
                            expect(service.hasZipCodeForCustomerItems(pickupOrder))
                                .toBeFalsy();
                        });
                    });
                    describe('and zipcode is not an empty string', () => {
                        it('true is returned',()=>{
                            pickupOrder.originationLocation.zipCode="12345";
                            expect(service.hasZipCodeForCustomerItems(pickupOrder))
                                .toBeTruthy();
                        });
                    });
                });
                describe('and zipcode is undefined', () => {
                    it('false is returned',()=>{
                        delete pickupOrder.originationLocation.zipCode;
                        expect(service.hasZipCodeForCustomerItems(pickupOrder))
                            .toBeFalsy();
                    });
                });
            });
            describe('and originationLocation is not defined', () => {
                it('false is returned',()=>{
                    delete pickupOrder.originationLocation;
                    expect(service.hasZipCodeForCustomerItems(pickupOrder))
                        .toBeFalsy();
                });
            });
        });
        describe('when order is delivery', () => {
            describe('and terminalLocation is defined', () => {
                describe('and zipcode is an empty string', () => {
                    it('false is returned',()=>{
                        deliveryOrder.terminalLocation.zipCode="";
                        expect(service.hasZipCodeForCustomerItems(deliveryOrder))
                            .toBeFalsy();
                    });
                });
                describe('and zipcode is not an empty string', () => {
                    it('true is returned',()=>{
                        deliveryOrder.terminalLocation.zipCode="12345";
                        expect(service.hasZipCodeForCustomerItems(deliveryOrder))
                            .toBeTruthy();
                    });
                });
            });
            describe('and originationLocation is not defined', () => {
                it('false is returned',()=>{
                    delete deliveryOrder.terminalLocation;
                    expect(service.hasZipCodeForCustomerItems(deliveryOrder))
                        .toBeFalsy();
                });
            });
        });
    });
    describe('setAddressForCustomerItems', () => {
        it('when order is pickup, originationLocation is updated',()=>{
            let newLocation = new Location();
            newLocation.address = 'xyz address';
            newLocation.zipCode = 'xyz address';
            service.setAddressForCustomerItems(pickupOrder, newLocation);
            expect(service.getAddressForCustomerItems(pickupOrder))
                .toEqual(newLocation);
        });
        it('when order is delivery, terminalLocation is returned',()=>{
            let newLocation = new Location();
            newLocation.address = 'xyz address';
            newLocation.zipCode = 'xyz address';
            service.setAddressForCustomerItems(deliveryOrder, newLocation);
            expect(service.getAddressForCustomerItems(deliveryOrder))
                .toEqual(newLocation);
        });
    });

    describe('setZipCodeForCustomerItems', () => {
        describe('when order is pickup',()=>{
            it('and originationLocation is undefined, originationLocation.zipCode is updated',()=>{
                let zipCode = 99999;
                delete pickupOrder.originationLocation;
                service.setZipCodeForCustomerItems(pickupOrder, zipCode);
                expect(service.getZipCodeForCustomerItems(pickupOrder))
                    .toEqual(zipCode);
            });
            it('and originationLocation is defined, originationLocation.zipCode is updated',()=>{
                let zipCode = 99999;
                service.setZipCodeForCustomerItems(pickupOrder, zipCode);
                expect(service.getZipCodeForCustomerItems(pickupOrder))
                    .toEqual(zipCode);
            });
        });
        describe('when order is delivery',()=>{
            it('and terminalLocation is undefined, terminalLocation.zipCode is updated',()=>{
                let zipCode = 99999;
                delete pickupOrder.terminalLocation;
                service.setZipCodeForCustomerItems(deliveryOrder, zipCode);
                expect(service.getZipCodeForCustomerItems(deliveryOrder))
                    .toEqual(zipCode);
            });
            it('and terminalLocation is defined, terminalLocation.zipCode is updated',()=>{
                let zipCode = 99999;
                service.setZipCodeForCustomerItems(deliveryOrder, zipCode);
                expect(service.getZipCodeForCustomerItems(deliveryOrder))
                    .toEqual(zipCode);
            });
        });
    });

});
