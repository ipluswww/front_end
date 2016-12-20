import _ from 'lodash';
class InventoryToCapacityDisplayController {
    constructor(StoredInventoryService, OrdersValidationService) {
        this._StoredInventoryService = StoredInventoryService;
        this._OrdersValidationService = OrdersValidationService;
    }

    getCurrentInventoryOnOrderCount() {
        if(this.order.inventory){
            let itemCount = this._StoredInventoryService.getInventoryItemCount(this.order.inventory);
            if(!this._OrdersValidationService.isPickup(this.order)){
                return -itemCount;
            }
            return itemCount;
        }
        return 0;
    }

    getPreviousInventoryForCustomerCount() {
        if(this.currentlyStoredInventory){
            return this._StoredInventoryService.getInventoryItemCount(this.currentlyStoredInventory);
        }
        return 0;
    }

    isCapacityExceeded() {
        if(!this._OrdersValidationService.isSpacePrice(this.order) || !this.order.spacePriceSelection || !this.order.spacePriceSelection.itemCap){
            return false;
        }
        return this.order.spacePriceSelection.itemCap <
        this.getTotalItemCount();
    }

    getTotalItemCount(){
        return this._StoredInventoryService.getTotalInventory(this.order, this.currentlyStoredInventory).length;
    }

    getCapacity() {
        return this.order.spacePriceSelection ? this.order.spacePriceSelection.itemCap : 0;
    }

    getCapacityDescription(){
        if(!this._OrdersValidationService.isSpacePrice(this.order)){
            return 'unlimited';
        }
        return this.getCapacity();

    }



}
InventoryToCapacityDisplayController.$inject = ['StoredInventoryService', 'OrdersValidationService'];
export default InventoryToCapacityDisplayController;
