import _ from 'lodash';
class InventoryHeaderComponentController {
    constructor() {
        this.init();
    }

    init() {
        this.inventoryTypes = [
            {
                name:'box',
                iconClass: 'drafts'
            },
            {
                name:'unboxed',
                iconClass: 'motorcycle'
            },
            {
                name:'furniture',
                iconClass: 'weekend'
            }
        ];

    }

    filterChanged(){
        this.onFilterChanged({$event : { filter : this.filter }});
    }

    isInventoryTypeSelected(inventoryType) {
        return (this.filter.containerTypes.indexOf(inventoryType.name) >= 0)
            && !this.isLocked;
    }

    toggleActivation(inventoryType) {
        if (this.isInventoryTypeSelected(inventoryType)) {
            // this.inventoryTypes =
            _.remove(this.filter.containerTypes, (atom) => {
                return (atom === inventoryType.name);
            });
        } else {
            this.filter.containerTypes.push(inventoryType.name);
        }
        this.filterChanged();
    }
};

InventoryHeaderComponentController.$inject = [];
export default InventoryHeaderComponentController;
