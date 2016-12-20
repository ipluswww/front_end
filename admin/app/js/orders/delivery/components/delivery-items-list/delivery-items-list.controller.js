import _ from 'lodash';
class DeliveryItemsListController {
    constructor($mdDialog, StoredInventoryService) {
        this._$mdDialog = $mdDialog;
        this._StoredInventoryService = StoredInventoryService;
        this.init();
    }

    init() {
        // Invnetory type: boxed, unboxed and furniture
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

    // UI event handler
    // open picture modal
    openPictureModal(container) {
        this._$mdDialog.show({
            controller: 'InventoryPhotoModalController as $ctrl',
            templateUrl: 'templates/orders/delivery/modals/inventory-photo.modal.html',
            parent: angular.element(document.body),
            clickOutsideToClose:false,
            locals: {inventory: container, customerId: this.order.customer._id}
        });
    }

    // deselect container from selected list
    removeContainer(container) {
        if(this.isLocked){
            return;
        }

        this.onItemRemoved({$event:{item:container}});
    }

    getItemLabel(item){
        let label = item.subType.name;
        label += (item.contents && item.contents !== '') ? ' - ' + item.contents : "";
        label += (item.label && item.label !== '') ? ' - ' + item.label  : "";
        return label;
    }
    
    getTotalPoints(){
        return this._StoredInventoryService.getPoints(this.order.inventory);
    }

    getTotalEstimatedWeight(){
        return this._StoredInventoryService.getEstimatedWeight(this.order.inventory);
    }

};

DeliveryItemsListController.$inject = ['$mdDialog', 'StoredInventoryService'];
export default DeliveryItemsListController;
