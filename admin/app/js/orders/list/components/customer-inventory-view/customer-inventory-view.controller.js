import _ from 'lodash';
class InventoryViewController {
    constructor(AppConstants, $mdDialog, $scope, AlertService) {
		this._AppConstants = AppConstants;
        this._$mdDialog = $mdDialog;
        this._$scope = $scope;
        this._AlertService = AlertService;
        this.init();
    }

    init() {
        this.filter = {jumpToTarget: null};
        // Invnetory type: boxed, unboxed and furniture
        this.inventoryTypes = [
            {
                name:'box',
                iconClass: 'drafts',
                active: true
            },
            {
                name:'unboxed',
                iconClass: 'motorcycle',
                active: true
            },
            {
                name:'furniture',
                iconClass: 'weekend',
                active: true
            }
        ];

    }

    // whenever inventory is changed outside or somewhere else, make sure to update the list
    $onChanges(changes){
        if (changes && changes.inventory) this.filteredInventories = _.cloneDeep(changes.inventory.currentValue);
    }

    // UI Helper
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
        }).then( (data) => {
            console.log(data);
        });
    }

    // UI event handler
    toggleActivation(inventoryType) {
        inventoryType.active = !inventoryType.active;
        this.filterInventories();
    }

    filterInventories() {
        let activeTypes = _.map(_.filter(this.inventoryTypes, (atom) => {
            return atom.active;
        }), 'name');
        this.filteredInventories = _.filter(this.inventory, (atom) => {
            return (activeTypes.indexOf(atom.subType.containerType.name) >=0);
        });
    }

    // UI display Helper for allocated space
    allocatedSpace() {
        if (this.space && this.space.length > 0) {
            let groupedSpace = _.groupBy(this.space, 'subType.name');
            return _.map(Object.keys(groupedSpace), (atom) => {
                return groupedSpace[atom].length + " " + atom;
            }).join();
        } else {
            return "";
        }
    }

};

InventoryViewController.$inject = ['AppConstants', '$mdDialog', '$scope', 'AlertService'];

export default InventoryViewController;
