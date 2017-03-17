import _ from 'lodash';
class AgentsController {

 constructor($state, $stateParams, $window, data) {
  this._$state = $state;
  this._$window = $window;
  window._$ctrl = this;
  this.init(data, $stateParams);
 }

 init(data, params) {
  let self = this;
  // Controller Variable definition
  this.totalCount = data.count;
  this.agents = data.data;

  this.selectedId = null;

  this.query = params;
 }

 // Table related events handler
 //------------------------------------------------------------------------------------------------------------------
 onPagination(page, limit) {
  let $ctrl = window._$ctrl; // TODO: get rid of this dirty hack
  let query = JSON.parse(JSON.stringify($ctrl.query));
  query.page = page;
  query.limit = limit;

  $ctrl._$state.go('app.admin.agent.list', query, {
   reload: true,
   notify: true,
   inherit: false
  });
 }


 onSearch() {
  this._$state.go(this._$state.current, this.query, {
   reload: true,
   notify: true,
   inherit: false
  });
 }

 // column order
 onOrder(order) {
   let $ctrl = window._$ctrl; // TODO: get rid of this dirty hack
   let query = JSON.parse(JSON.stringify($ctrl.query));
   query.sort = order;
   $ctrl._$state.go($ctrl._$state.current, query, {
    reload: true,
    notify: true,
    inherit: false
   });
  }
  // Select Row Event handler
 onRowSelect(row) {
  // Let it be simple for now
  this.selectedId = row._id;
 }

 // Back to previous location
 backTo() {
  this._$window.history.back();
 }

}

AgentsController.$inject = ['$state', '$stateParams', '$window', 'data'];
export default AgentsController;