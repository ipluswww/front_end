import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const BrandCampaignAddRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
 //get Toast
 toast: Ember.inject.service(),
 //model
 model() {
  return Ember.RSVP.hash({
   currDate: moment(),
   modesArr: Ember.A([Ember.Object.create({
     key: 0,
     val: 'Automatic When Approved'
    }),
    Ember.Object.create({
     key: 1,
     val: 'Automatic When All Approved'
    }),
    Ember.Object.create({
     key: 2,
     val: 'Manually'
    }),
   ]),
   statusArr: Ember.A([Ember.Object.create({
     key: 0,
     val: 'Pending'
    }),
    Ember.Object.create({
     key: 1,
     val: 'Active'
    }),
    Ember.Object.create({
     key: 2,
     val: 'Complete'
    }),
    Ember.Object.create({
     key: 3,
     val: 'Cancelled'
    }),
   ]),
   catsArr: Ember.A([Ember.Object.create({
     key: 'cat1',
     val: 'Category 1'
    }),
    Ember.Object.create({
     key: 'cat2',
     val: 'Category 2'
    }),
    Ember.Object.create({
     key: 'cat3',
     val: 'Category 3'
    })
   ]),
   typesArr: Ember.A([Ember.Object.create({
     key: 0,
     val: 'Marketing'
    }),
    Ember.Object.create({
     key: 1,
     val: 'Engagement'
    })
   ]),
   campaign: this.store.createRecord('campaign', {
    'start': moment(),
    'end': moment()
   }),
   errors: DS.Errors.create(),
   data: Ember.Object.create({
    isSubmitted: false
   })
  });

 },
 //actions
 actions: {
  //Used to add campaign
  addCampaign(isDraft) {
   if (this.validate()) {
    this.currentModel.data.set('isSubmitted', true);

    let campaignObj = this.currentModel.campaign;
    let brand_id = this.modelFor('home.brand').brand_id;
    let brandObj = this.store.peekRecord('brand', brand_id);
    if (brand_id) {
     campaignObj.set('brand', brandObj);
    }

    campaignObj.set('isDraft', isDraft);
    campaignObj.set('startTime', moment(campaignObj.get('start')).unix() * 1000);

    campaignObj.set('endTime', moment(campaignObj.get('start')).unix() * 1000);

    campaignObj.save().then((res) => {
     this.currentModel.data.set('isSubmitted', false);
     this.get('toast').success('Campaign has been added successfully');
     this.transitionTo('home.brand.campaign.details', {
      brand_id: brand_id,
      camp_id: res.get('id')
     });

    }, () => {
     this.currentModel.data.set('isSubmitted', false);
    });
   }
  }
 },
 //validate adding of roles
 validate() {
  let campaign = this.currentModel.campaign;
  let errors = this.currentModel.errors;
  if (!campaign.get('name')) {
   errors.add('name', 'Please enter campaign name!');
  } else {
   errors.remove('name');
  }

  if (campaign.get('status') == null) {
   errors.add('status', 'Please select status!');
  } else {
   errors.remove('status');
  }

  if (campaign.get('type') == null) {
   errors.add('type', 'Please select type!');
  } else {
   errors.remove('type');
  }

  if (!campaign.get('category')) {
   errors.add('category', 'Please select category!');
  } else {
   errors.remove('category');
  }

  if (campaign.get('mode') == null) {
   errors.add('mode', 'Please select mode!');
  } else {
   errors.remove('mode');
  }
  return errors.get('isEmpty');
 }
});

export default BrandCampaignAddRoute;