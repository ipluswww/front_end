import Ember from 'ember';
import DS from 'ember-data';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const CampaignPostsRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
 //get Toast
 toast: Ember.inject.service(),
 //model
 model() {
  let brand_id = this.modelFor('home.brand').brand_id;
  return Ember.RSVP.hash({
   currDate: new Date(),
   isPostsTabActive: true,
   posts: this.store.query('posting', {
    brand: brand_id
   }),
   filters: Ember.Object.create({
    isApproved: '',
    type: '',
    startdD: '',
    endD: ''
   }),
   errors: DS.Errors.create(),
   data: Ember.Object.create({
    isSubmitted: false
   })
  });
 },
 setupController: function(controller, model) {
  this._super(controller, model);
  //Some modifications
  //..
  //end of modificaitons
  controller.set('model', model);
 }
});

export default CampaignPostsRoute;