import _ from 'lodash';
import moment from 'moment';
class AgentDetailController {

 constructor($state, $stateParams, $q, User, Agent, Warehouse, QueryData, AlertService, $mdDialog, $mdEditDialog, $window) {
  this._edit = $state.current.data.edit;
  this._$state = $state;
  this._$q = $q;
  this._User = User;
  this._Service = Agent;
  this._Warehouse = Warehouse;
  this._QueryData = QueryData;
  this._id = $stateParams.id;
  this._$mdDialog = $mdDialog;
  this._$mdEditDialog = $mdEditDialog;
  this._$window = $window;
  this._AlertService = AlertService;

  this.init();
 }

 init() {
  // Init class variable
  this.warehousesToBeAssociated = [];

  if (this._id) {
   this._Service.get(this._id).then((res) => {
    this.data = _.clone(res);
   });
  } else {
   this.data = this.defaultObject();
  }
 }


 editCellValue(event, warehouse, fieldName, fieldLabel) {
  let self = this;
  event.stopPropagation();

  var editDialog = {
   modelValue: warehouse[fieldName],
   placeholder: 'Input ' + fieldLabel,
   save: function(input) {
    warehouse[fieldName] = input.$modelValue;

    let object = {
     _id: warehouse._id
    };
    object[fieldName] = input.$modelValue;
    self._Warehouse.update(object).then((res) => {})
   },
   targetEvent: event,
   title: 'Input ' + fieldLabel,
   type: 'number',
   validators: {
    'step': 0.01
   }
  };

  this._$mdEditDialog.small(editDialog);

 }

 defaultObject() {
  return {
   name: null,
   phone: null,
   email: null,
   warehouseLocations: []

  };
 }

 // Check code duplciation.
 checkDuplication() {
  if (this.originalCode != this.data.name) {
   this._Service.search(this.data.name).then((res) => {
    this.agentForm["name"].$setValidity("server", res.valid);
   });
  } else {
   this.agentForm["name"].$setValidity("server", true);
  }
 }

 // Button event handler
 cancelEdit() {
  this._$state.go('app.admin.agent.list');
 }

 // delete button handler
 // un-associate warehouse from agent.
 deleteItem(warehouse) {
  let self = this;
  this._$mdDialog.show({
   controller: 'ConfirmModalController as  $ctrl',
   templateUrl: 'templates/shared/_confirm_dialog.html',
   parent: angular.element(document.body),
   clickOutsideToClose: false,
   locals: {
    title: 'Warning',
    textContent: 'Are you sure want to delete this agent?'
   }
  }).then(data => {
   self._Service.delete(self.data._id).then(() => {
    self._AlertService.success("The agent has been successfully removed.").then(() => {
     self._$state.go('app.admin.agent.list');
    }, (err) => {
     self._AlertService.error(`${err.data.error} : ${err.data.message}` || "Error while deleting agent.");
    });
   });
  });
 }


 // launch the warehouse modal to associate a warehouse to agent.
 // Remember this warehouse list modal is supposed to list the warehouses not bound to any agent
 openWarehouseModal() {
  let self = this;
  this._Warehouse.freeWarehouses().then((warehouses) => {
   this._$mdDialog.show({
    controller: 'AgentWarehousesModalController as $ctrl',
    templateUrl: 'templates/admin/agent/_warehouse_modal.html',
    parent: angular.element(document.body),
    clickOutsideToClose: false,
    locals: {
     list: warehouses
    }
   }).then((data) => {
    this.data.warehouseLocations = _.uniq(this.data.warehouseLocations.concat(data.warehouses));
    let promises = [];
    _.forEach(data.warehouses, (atom) => {
     if (self._id) {
      let promise = self.associate(atom);
      if (promise) promises.push(promise);
     } else {
      self.warehousesToBeAssociated.push(atom._id);
     }
    });

    // only show the feedback.
    if (self._id) {
     self._$q.all(promises)
      .then(self._AlertService.success("Warehouse and agent has been associated."));
    }

   });
  });

 }



 saveData() {
  let self = this;
  if (this._id) {
   this._Service.update(this.data).then((res) => {
    this._$state.go('app.admin.agent.detail', {
     id: this._id
    });
   });
  } else {
   let data = _.clone(this.data);
   delete data.warehouseLocations;
   // in order to prevent double update for warehouseLocations
   this._Service.create(data).then((res) => {
    // After creating a new record we should associate agent with warehouses.
    let list = _.clone(_.uniq(this.warehousesToBeAssociated));
    let promises = [];
    _.forEach(list, (atomId) => {
     let promise = self._Warehouse.associateAgent(atomId, res._id);
     promises.push(promise);
    });

    // after all associating, we will navigate away
    self._$q.all(promises).then(() => {
     self._$state.go('app.admin.agent.detail', {
      id: res._id
     });
    });
   });
  }
 }

 // un-associate warehouse from agent.
 unassociate(warehouse) {
  let self = this;
  this._$mdDialog.show({
   controller: 'ConfirmModalController as  $ctrl',
   templateUrl: 'templates/shared/_confirm_dialog.html',
   parent: angular.element(document.body),
   clickOutsideToClose: false,
   locals: {
    title: 'Warning',
    textContent: 'Are you sure want to remove the association between agent and warehouse?'
   }
  }).then(data => {
   self._Warehouse.unassociateAgent(warehouse._id).then(() => {
    self._AlertService.success("Warehouse successfully has been unassociated from the agent.");
    _.remove(self.data.warehouseLocations, (w) => {
     return (warehouse._id == w._id);
    });
   }, (err) => {
    self._AlertService.error(`${err.data.error} : ${err.data.message}` || "Error while unassociating warehouse from the agent.");
   });
  });
 }

 // associate agent with ware hosue.
 associate(warehouse) {
  if (this._id) {
   return this._Warehouse.associateAgent(warehouse._id, this._id);
  }
  return null;
 }


 // The helper function: only record created within 24 hours is deletable
 isDeletable() {
  if (this.data && this.data._id && this.data.dateCreated) {
   return (moment.utc().diff(moment.utc(this.data.dateCreated), 'hours') <= 24);
  }
  return false;
 }


 // Back to previous location
 backTo() {
  this._$window.history.back();
 }

 // Back to list
 backToList() {
  this._QueryData.setQuery('agent', null);
  this._$state.go('app.admin.agent.list');
 }

}

AgentDetailController.$inject = ['$state', '$stateParams', '$q', 'User', 'Agent', 'Warehouse', 'QueryData', 'AlertService', '$mdDialog', '$mdEditDialog', '$window'];
export default AgentDetailController;