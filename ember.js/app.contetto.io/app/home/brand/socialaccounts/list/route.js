import Ember from 'ember';

const {
  inject: {service}
} = Ember;

const SocialAccountListRoute = Ember.Route.extend({
  toast: service(),

  model() {
    const brandId = this.paramsFor('home.brand').brand_id;
    let brand = this.store.peekRecord('brand', brandId);

    this.store.findAll('social-account');

    return brand.get('socialAccounts');
  },

  actions: {
    deleteAccount(accountId) {

      if(confirm('Are you sure you want to delete')) {

        this.store.findRecord('social-account', accountId, { backgroundReload: false })
        .then((account) => {
          account.destroyRecord();
        }).then(() => {
          this.get('toast').success('Account deleted successfully', 'Deleted');
        });
      }
    }
  }
});

export default SocialAccountListRoute;
