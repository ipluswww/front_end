import _ from 'lodash';

class StoredInventoryService {
    constructor(OrdersValidationService){
        this._OrdersValidationService = OrdersValidationService;
    }
    getUniqueWarehouseLocationsFromInventory(inventory){
        let warehouseLocations = [];
        _.forEach(inventory, (inv) => {
            if(inv.warehouseLocation){
                warehouseLocations.push(inv.warehouseLocation);
            }
        });

        warehouseLocations = _.uniqBy(warehouseLocations, (wh) => {
            return wh;
        });
        return warehouseLocations;
    }

    getCurrentlyStoredInventoryFiltered(inventory, order, filter) {
        let inv = _.filter(inventory, (inv) => {
            return ((filter.containerTypes.indexOf(inv.subType.containerType.name) >= 0) &&
                (inv.label.toLowerCase().indexOf(filter.search.toLowerCase()) >= 0));
        });
        inv = _.differenceBy(inv, order.inventory, '_id');
        return inv;
    }

    getGroupedInventoryByWarehouse(inventory){
        // Group by warehouse location
        let inv = _.groupBy(inventory, (inv) => {
            return inv.warehouseLocation;
        });

        return inv;
    }

    getGroupedInventoryBySubTypeContentLabel(inventory){
        let groups = _.groupBy(inventory, (item) => {
            return item.subType._id + '|' + item.contents + '|' + item.label;
        });

        let groupsWithSums = _.map(groups, (group, index) => {
            return {
                inventoryIndex: index,
                subType: group[0].subType,
                contents: group[0].contents,
                label: group[0].label,
                qty: group.length
            }
        });
        return groupsWithSums;
    }

    adjustInventoryBasedOnItemQuantityChanged(event, order) {
        let itemsInGroup = _.filter(order.inventory, (item)=>{
            return item.subType._id === event.groupedItem.subType._id
                && item.contents === event.groupedItem.contents
                && item.label === event.groupedItem.label;
        });
        let difference = itemsInGroup.length - event.groupedItem.qty;
        if(difference < 0) {
            for(let i=difference;i<0;i++) {
                let newItem = _.pick(itemsInGroup[0], ['subType','contents','label']);
                order.inventory.push(newItem);
            }

        }
        else {
            for(let i=difference;i>0;i--) {
                let itemToDelete = _.find(order.inventory, (item)=>{
                    return item.subType._id === event.groupedItem.subType._id
                        && item.contents === event.groupedItem.contents
                        && item.label === event.groupedItem.label;
                });
                let index = order.inventory.indexOf(itemToDelete);
                order.inventory.splice(index, 1);
            }
        }
    }

    getPoints(totalInventory) {
        let totalPoints = 0;
        _.forEach(totalInventory, (inventory) => {
            totalPoints += inventory.subType.points * this.getInventoryItemQty(inventory);
        });
        return totalPoints;
    }

    getInventoryItemCount(totalInventory) {
		let totalItems = 0;
        _.forEach(totalInventory, (inventory) => {
			totalItems += this.getInventoryItemQty(inventory);

        });
        return totalItems;
    }

	getInventoryItemQty(item){
		if(item.qty){
			return item.qty;
		}
		return 1;
	}

    getStorageUnitCapacity(order, storageUnits) {
		if(angular.isUndefined(order.storageUnit)
            || order.storageUnit === null
			|| angular.isUndefined(order.storageUnit.subType)
			|| angular.isUndefined(order.storageUnit.subType._id)
			|| order.storageUnit._id===null){
			return 0;
		}

        let storageUnit = this.getStorageUnitRecordFromOrderStorageUnit(order, storageUnits);
        if(!storageUnit){
            return 0;
        }
        return storageUnit.itemCap;
    }

	getStorageUnitRecordFromOrderStorageUnit(order, storageUnits){
		return _.find(storageUnits, (storageUnit)=> {
			return storageUnit.unit && storageUnit.unit._id === order.storageUnit.subType._id;
		});
	}

	getTotalInventory(order, currentlyStoredInventory){
		let totalInventory = [];
		totalInventory = totalInventory.concat(currentlyStoredInventory);
		if(this._OrdersValidationService.isPickup(order)){
			totalInventory = totalInventory.concat(order.inventory);
		}
		else {
			totalInventory = _.differenceBy(totalInventory, order.inventory, '_id');
            totalInventory = _.uniqBy(totalInventory, (inv) => {
                return inv._id;
            });
		}
		return totalInventory;
	}

    getEstimatedWeight(totalInventory) {
        let totalWeight = 0;
        _.forEach(totalInventory, (inventory) => {
            totalWeight += inventory.subType.estimatedWeight * this.getInventoryItemQty(inventory);
        });
        return totalWeight;
    }
}

StoredInventoryService.$inject = ['OrdersValidationService'];
export default StoredInventoryService;
