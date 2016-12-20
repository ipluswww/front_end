import PickupOrderModel from '../../../abstract/model/pickup-order.js'
import DeliveryOrderModel from '../../../abstract/model/delivery-order.js'

class SharedOrderService {
    constructor(LocalStorageService, AppConstants, OrdersValidationService){
        this._AppConstants = AppConstants;
        this._LocalStorageService = LocalStorageService;
        this._OrdersValidationService = OrdersValidationService;
    }

    getOrder(key) {
        let order = this._LocalStorageService.get(key);
        if(angular.isUndefined(order) || order ===null) {
            if(key === this._AppConstants.orderTypes.pickup) {
                order = new PickupOrderModel();
            }
            else {
                order = new DeliveryOrderModel();
            }
            this.setOrder(order);
        }
        return order;
    }

    setOrder(order) {
        let key = this._OrdersValidationService.getOrderType(order);
        this._LocalStorageService.set(key, order);
    }

    clear(){
        this._LocalStorageService.remove(this._AppConstants.orderTypes.pickup);
        this._LocalStorageService.remove(this._AppConstants.orderTypes.delivery);
    }

}

SharedOrderService.$inject = ['LocalStorageService',
    'AppConstants', 'OrdersValidationService'];
export default SharedOrderService;
