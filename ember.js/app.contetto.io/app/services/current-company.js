import Ember from 'ember';

const {set} = Ember;

export default Ember.Service.extend({
  data: null,

  init() {
    this._super(...arguments);
    this.set('data', []);
  },

  changeCompany(companyId) {
    set(this.get('data'), 'companyId', companyId);
  },

  changeBrand(brandId) {
    set(this.get('data'), 'brandId', brandId);
  }
});
