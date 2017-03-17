import Ember from 'ember';
import DS from 'ember-data';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {inject: {service}} = Ember;

const AccountsSocialRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service('session'),

  model() {
    const brandId = this.paramsFor('home.brand').brand_id;
    const brand = this.store.peekRecord('brand', brandId);

    return Ember.Object.create({
      account: this.store.createRecord('social-account', {
        brand:  brand
      }),
      brandId: brandId,
      errors: DS.Errors.create(),
      isSubmitted: false,
      page: false,
      type: 'profile'
    });
  },

  actions: {
    signIn(provider) {
      this.get('session').authenticate('authenticator:torii', provider)
        .then(function() {
        }, function(error){
          console.log(error);
        });
    },

    saveAccount() {
      let errors = this.currentModel.errors;
      const brandId = this.controller.get('model.brandId');
      const platform = this.controller.get('tokenParser.data.0.type');
      const token = this.controller.get('tokenParser.data.0.token');

      this.currentModel.account.set('platform', platform);

      if(this.currentModel.get('type') === 'profile') {
        this.currentModel.account.set('token', token);
      } else {
        let pageDetail = this.currentModel.get('page');

        this.currentModel.account.set('pageId', pageDetail.id);
        this.currentModel.account.set('pageTitle', pageDetail.name);
        this.currentModel.account.set('token', pageDetail.token);
      }

      if(platform === 'twitter') {
        this.currentModel.account.set('tokenSecret',
          this.controller.get('tokenParser.data.0.tokenSecret')
        );

        this.currentModel.account.set('pageId',
          this.controller.get('tokenParser.data.0.pageId')
        );
      } else if (platform === 'linkedin') {
        this.currentModel.account.set('pageId',
          this.controller.get('tokenParser.data.0.pageId')
        );
      }

      if(this.validate()) {
        this.currentModel.set('isSubmitted', true);

        this.currentModel.account.save().then(() => {
          this.currentModel.set('isSubmitted', false);
          errors.remove('title');

          this.controller.get('tokenParser').clear();
          this.transitionTo('home.brand.socialaccounts.list', brandId);
          }, () => {
            this.currentModel.set('isSubmitted', false);
            errors.add('title', 'Title should not be empty');
          });
      }
    },

    facebookAction(type) {

      if(type === 'page' && !this.currentModel.get('page')) {
        this.controller.set('pageError', 'Choose the page');
        return false;
      }

      if(type === 'profile') {
        this.currentModel.set('page', false);
      }

      this.controller.set('changeStatus', true);
      this.currentModel.set('type', type);
    },

    willTransition() {
      this.currentModel.set('page', false);
      this.currentModel.set('type', 'profile');

      this.controller.get('tokenParser').clear();
      this.controller.set('changeStatus', false);

      if(this.currentModel.account.get('hasDirtyAttributes')) {
        this.currentModel.account.rollbackAttributes();
      }
    },

    didTransition() {
      this.controller.set('changeStatus', false);

    }
  },

  validate() {
    let errors = this.currentModel.errors;

    if(Ember.isEmpty(this.currentModel.account.get('title'))) {
      errors.add('title', 'Title should not be empty');
      return false;
    } else {
      return true;
    }
  }
});

export default AccountsSocialRoute;
