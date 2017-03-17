import Ember from 'ember';

const WelcomeRoute = Ember.Route.extend({
  session: Ember.inject.service(),

  actions: {
    logout() {
      this.get('session').invalidate();
    }
  },

  model() {
    const userId = this.get('session.data.authenticated.userId');
    return Ember.RSVP.hash({
      user: this.store.findRecord('user', userId)
    });
  }

//  model () {
//    return Ember.Object.create({
//      company: this.store.createRecord('company'),
//      companyInvites: this.store.query('invite', {
//        type : 'company'
//      }),
//      brand: this.store.createRecord('brand'),
//      audience: this.store.createRecord('audience'),
//      errors: DS.Errors.create(),
//      gender: this.store.query('audiencesData', {
//        search: 'GENDER'
//      }),
//      isSubmitted: false
//    });
//  }
});

export default WelcomeRoute;
