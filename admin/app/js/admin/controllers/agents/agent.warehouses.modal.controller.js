import _ from 'lodash';
class AgentWarehousesModalController {
 constructor(Warehouse, $mdDialog, list) {
  this._Warehouse = Warehouse;
  this._$mdDialog = $mdDialog;

  this.list = list;
  this.warehouses = [];
 }


 // Helper functions
 //------------------------------------------------------------------------------------------------------------------

 // Checkbox list helper functions
 //----------------------------------------------------------------------------------
 // Check item is existing in the list with the proven key
 exists(item, key) {
  return (_.findIndex(this.warehouses, (atom) => {
   return item[key] === atom[key];
  }) >= 0);
 }

 // Adds or removes an item based on existence
 toggle(item, key) {
  if (this.exists(item, key)) {
   _.remove(this.warehouses, (atom) => {
    return item[key] === atom[key];
   });
  } else {
   this.warehouses.push(item);
  }
 }



 cancel() {
  this._$mdDialog.cancel();
 }

 confirm() {
  this._$mdDialog.hide({
   warehouses: this.warehouses
  });
 }

}

AgentWarehousesModalController.$inject = ['Warehouse', '$mdDialog', 'list'];
export default AgentWarehousesModalController;