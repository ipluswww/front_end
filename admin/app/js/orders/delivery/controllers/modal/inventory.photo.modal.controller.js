import _ from 'lodash';
import moment from 'moment';
class  InventoryPhotoModalController {
    constructor (AppConstants, Order, Container, AlertService, $mdDialog, inventory, customerId){
		this._AppConstants = AppConstants;
        this._Order = Order;
		this._Container = Container;
		this._AlertService = AlertService;
        this._$mdDialog = $mdDialog;
        this.inventory = inventory;
		this.customerId = customerId;
    }

	// UI event handler
	// upload photo on file select or drop
    uploadPhoto(file) {
		if (file) {
            // copied from the other source
			this._Container.uploadPhoto(this.inventory._id, file, this.customerId).then((res) => {
				this.inventory.photos.push(res);
				this._AlertService.success("Inventory photo has succcessfully been uploaded.");
			});
		}
	}

	// Get photo url for display purpose on UI, display every photo
	getPhotoURL(photo) {
		return photo ? this._AppConstants.api + "/containers/" + this.inventory._id + "/photos/" + photo._id + "/50" : "";
	}
	
	// dialog related methods
    cancel() {
		this._$mdDialog.cancel();
	}

	confirm() {
		this._$mdDialog.hide({order: this.order});
	}
}

InventoryPhotoModalController.$inject = ['AppConstants', 'Order', 'Container', 'AlertService', '$mdDialog', 'inventory', 'customerId'];
export default InventoryPhotoModalController;
