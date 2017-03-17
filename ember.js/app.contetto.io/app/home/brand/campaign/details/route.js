import Ember from 'ember';
import DS from 'ember-data';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import moment from 'moment';

const BrandCampaignDetailRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
 //get Toast
 toast: Ember.inject.service(),
 //model
 model() {
  //let startDate = moment();
  //let endDate = moment();

  let camp_id = this.modelFor('home.brand.campaign').camp_id;

  return Ember.RSVP.hash({
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
   campaign: this.store.findRecord('campaign', camp_id).then(function(res) {
    res.set('start', moment(res.get('startTime')));
    res.set('end', moment(res.get('endTime')));
    return res;
   }),
   startD: this.store.findRecord('campaign', camp_id).then(function(res) {
    return moment(res.get('startTime'));
   }),
   endD: this.store.findRecord('campaign', camp_id).then(function(res) {
    return moment(res.get('endTime'));
   }),
   errors: DS.Errors.create(),
   isDetailsTabActive: true,
   data: Ember.Object.create({
    isSubmitted: false
   })
  });

 },
 //actions
 actions: {
  //Used to add campaign
  editCampaign(isDraft) {
   if (this.validate()) {
    //this.currentModel.data.set('isSubmitted',true);

    let campaignObj = this.currentModel.campaign;

    let brand_id = this.modelFor('home.brand').brand_id;
    let brandObj = this.store.peekRecord('brand', brand_id);
    if (brand_id) {
     campaignObj.set('brand', brandObj);
    }

    campaignObj.set('isDraft', isDraft);

    campaignObj.set('startTime', moment(campaignObj.get('start')).unix() * 1000);
    campaignObj.set('endTime', moment(campaignObj.get('start')).unix() * 1000);

    campaignObj.save().then(() => {
     this.currentModel.data.set('isSubmitted', false);
     this.get('toast').success('Campaign has been updated successfully');
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

export default BrandCampaignDetailRoute;