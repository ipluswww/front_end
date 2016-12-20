import _ from 'lodash';
class AvailableInventoriesListController {
    constructor(StoredInventoryService) {
        this._StoredInventoryService = StoredInventoryService;
        this.groupedInventory={};
        this.customerWarehouseLocations=[];
    }

    $onInit() {
        this.setWarehouses();
        this.setGroupedInventory();
    }

    $onChanges(changes){
        if(changes.currentlyStoredInventory && changes.currentlyStoredInventory.currentValue){
            this.setWarehouses(changes.currentlyStoredInventory.currentValue);
            this.setGroupedInventory(changes.currentlyStoredInventory.currentValue);
        }
    }

    setWarehouses(inventory){
        this.customerWarehouseLocations =
            this._StoredInventoryService
                .getUniqueWarehouseLocationsFromInventory(inventory);
    }

    setGroupedInventory(inventory){
        this.groupedInventory = this._StoredInventoryService
            .getGroupedInventoryByWarehouse(inventory);
    }

    getItemLabel(item){
        return item.label === ""? item.subType.name : item.label;
    }

    getTotalPoints(){
        return this._StoredInventoryService.getPoints(this.currentlyStoredInventory);
    }

    getTotalEstimatedWeight(){
        return this._StoredInventoryService.getEstimatedWeight(this.currentlyStoredInventory);
    }

    addItem(item) {
        this.onItemAddedToDelivery({$event:{ item: item }});
    }

    getWarehouseLocationAddress(warehouseLocation){
        let warehouse = _.find(this.warehouseLocations, (wl)=>{
            return wl._id = warehouseLocation;
        });
        return warehouse.location.address;
    }
};

AvailableInventoriesListController.$inject = ['StoredInventoryService'];
export default AvailableInventoriesListController;
