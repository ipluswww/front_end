import Ember from 'ember';

const {
  inject: {service},
  computed
} = Ember;

export default Ember.Component.extend({
  store: service('store'),

  companyDetail: service('current-company'),

  brands: computed('companies.[]', 'companyDetail.data.companyId', function() {

    if(this.get('companies.isLoaded') && this.get('companyDetail.data.companyId')) {
      const currentCompanyId = this.get('companyDetail.data.companyId');
      const company = this.get('store').peekRecord('company', currentCompanyId);

      return company.get('brands');
    }

    return [];
  }),

  init() {
    this._super(...arguments);

    const _this = this;
    const firstCompany = this.get('store').peekAll('company');


    if(!Ember.isEmpty(this.get('companies'))) {
      const defaultCompanyId = this.get('companies').get('firstObject').get('id');

    this.send('changeCompany', defaultCompanyId);
    }

    if(!Ember.isEmpty(this.get('brands'))) {
      const defaultBrandId = this.get('brands').get('firstObject').get('id');

    this.send('changeBrand', defaultBrandId);
    }

    if(Ember.isEmpty(this.get('companies')) && !Ember.isEmpty(this.get('brandList'))) {

      this.get('brandList').forEach(function(d) {

        d.belongsTo('company').load().then(() => {
          _this.send('changeCompany', firstCompany.get('firstObject').get('id'));
        });
      });
    }
  },

  actions: {
    changeCompany(companyId) {
      this.get('companyDetail').changeCompany(companyId);
    },

    changeBrand(brandId) {
      this.get('companyDetail').changeBrand(brandId);
    }
  }
});
