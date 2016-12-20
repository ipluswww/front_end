import PickupOrderModel from '../../../app/js/abstract/model/pickup-order.js';
import DeliveryOrderModel from '../../../app/js/abstract/model/delivery-order.js';
import AppConstants from '../../../app/js/config/app.constants.js';
import OrdersCustomerService from '../../../app/js/services/orders.customer.service.js';

describe('OrdersCustomerService', () => {
    let OrdersValidationService = jasmine.createSpyObj('OrdersValidationService',
        ['hasExistingCustomer']);
    let OrdersAddressService = jasmine.createSpyObj('OrdersAddressService',
        ['hasExistingCustomer']);
    let service = new OrdersCustomerService(OrdersValidationService, OrdersAddressService);
    let order;

    beforeEach(()=>{
        order  = new PickupOrderModel();
        });

    describe('setCustomerValuationFromCustomer()', ()=>{
        describe('and the customerValuation on the customer is defined to 1',()=> {
            beforeEach(()=>{
                order.customer.customerValuation = 1;
            });
            describe('and customerValuation on the order does not exist',()=>{
                beforeEach(()=>{
                    delete order.customerValuation;
                });
                it('the customer valuation on the order is set to 1',()=>{
                    service.setCustomerValuationFromCustomer(order);
                    expect(order.customerValuation).toEqual(1);
                });
                it('the customer valuation on the customer remains 1',()=>{
                    service.setCustomerValuationFromCustomer(order);
                    expect(order.customer.customerValuation).toEqual(1);
                });
            });
            describe('and customerValuation on the order equals 1',()=>{
                beforeEach(()=>{
                    order.customerValuation = 0;
                });
                it('the customer valuation on the order is set to 1',()=>{
                    service.setCustomerValuationFromCustomer(order);
                    expect(order.customerValuation).toEqual(1);
                });
                it('the customer valuation on the customer remains 1',()=>{
                    service.setCustomerValuationFromCustomer(order);
                    expect(order.customer.customerValuation).toEqual(1);
                });
            });
        });
        describe('and the customerValuation on the customer is undefined',()=> {
            beforeEach(()=>{
                delete order.customer.customerValuation;
            });
            describe('and customerValuation on the order does not exist',()=>{
                beforeEach(()=>{
                    delete order.customerValuation;
                });

                it('the customer valuation on the order remains undefined',()=>{
                    service.setCustomerValuationFromCustomer(order);
                    expect(order.customerValuation).toBeUndefined();
                });
                it('the customer valuation on the customer remains undefined',()=>{
                    service.setCustomerValuationFromCustomer(order);
                    expect(order.customer.customerValuation).toBeUndefined();
                });
            });
            describe('and customerValuation on the order equals zero',()=>{
                beforeEach(()=>{
                    order.customerValuation = 0;
                });
                it('the customer valuation on the order is undefined',()=>{
                    service.setCustomerValuationFromCustomer(order);
                    expect(order.customerValuation).toBeUndefined();
                });
                it('the customer valuation on the customer is undefined',()=>{
                    service.setCustomerValuationFromCustomer(order);
                    expect(order.customer.customerValuation).toBeUndefined();
                });
            });
            describe('and customerValuation on the order equals one',()=>{
                beforeEach(()=>{
                    order.customerValuation = 1;
                });
                it('the customer valuation on the order is undefined',()=>{
                    service.setCustomerValuationFromCustomer(order);
                    expect(order.customerValuation).toBeUndefined();
                });
                it('the customer valuation on the customer is undefined',()=>{
                    service.setCustomerValuationFromCustomer(order);
                    expect(order.customer.customerValuation).toBeUndefined();
                });
            });
        });

    });
});
