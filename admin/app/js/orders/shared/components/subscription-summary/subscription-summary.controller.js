class SubscriptionSummaryController {
    constructor(StoredInventoryService, OrdersValidationService) {
        this._StoredInventoryService = StoredInventoryService;
        this._OrdersValidationService = OrdersValidationService;
    }

    getCurrentlyStoredItemCount() {
        return this._StoredInventoryService.getInventoryItemCount(this.currentlyStoredInventory);
    }

    getCurrentPriceSelection() {
        if(this.isCustomerSpacePrice()) return 'Space Price';
        return 'Item Price';
    }

    getAddRemovePhrase() {
        if(this._OrdersValidationService.isPickup(this.order)){
            return 'Added';
        }
        return 'Removed';
    }
    getOrderInventoryCount() {
        return this._StoredInventoryService.getInventoryItemCount(this.order.inventory);
    }

    getPrice() {
        if(this.order.spacePrice){
            return this.order.spacePriceSelection.price;
        }
        return this.order.itemPriceSelection.price;
    }

    hasPreviouslyStoredItems() {
        return this.getCurrentlyStoredItemCount() > 0;
    }

    isCustomerSpacePrice(){
        return this.order.customer.spacePrice;
    }
}
SubscriptionSummaryController.$inject = ['StoredInventoryService', 'OrdersValidationService'];
export default SubscriptionSummaryController;
