import _ from 'lodash';
class ActualInventoriesListController {
    constructor($state, Order, User, Container, Pricing, StoredInventoryService) {
        this._$state = $state;
        this._Order = Order;
        this._User = User;
        this._Container = Container;
        this._Pricing = Pricing;
        this._StoredInventoryService = StoredInventoryService;
        this.groupedInventory = [];
        this.init();
    }

    init() {
         this.itemTypes = [];

        if (!this.order.inventory || this.order.inventory.length < 1 ) {
            this.order.inventory = []; // main data holder
        }

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

    $onChanges(changes){
        this.groupedInventory = this._StoredInventoryService.getGroupedInventoryBySubTypeContentLabel(changes.order.currentValue.inventory);
    }

    // UI display helper
    getIconClass(container) {
        let inventoryType = container.subType.containerType.name;
        let index = _.findIndex(this.inventoryTypes, (atom) =>{
            return (atom.name === inventoryType);
        });

        if (index >= 0) {
            return this.inventoryTypes[index].iconClass;
        }
    }

    updateQuantity(inventory, $index) {
        if(this.isLocked) return;

        this.onDataUpdated({$event:{ groupedItem: inventory}});
    }

    // remove icon click event handler
    removeItem(inventory, $index) {
        if(this.isLocked) return;
        inventory.qty=0;
        this.onDataUpdated({$event:{ groupedItem: inventory}});
    }

    getTotalPoints(){
        return this._StoredInventoryService.getPoints(this.order.inventory);
    }

    getTotalEstimatedWeight(){
        return this._StoredInventoryService.getEstimatedWeight(this.order.inventory);
    }
}

ActualInventoriesListController.$inject = ['$state', 'Order', 'User',
    'Container', 'Pricing', 'StoredInventoryService'];
export default ActualInventoriesListController;
