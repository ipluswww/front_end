import Ember from 'ember';
import DS from 'ember-data';

const {
  inject: {
    service
  }
} = Ember;

export default Ember.Route.extend({
  session: service('session'),
  model () {
    return Ember.Object.create({
      audience: this.store.createRecord('audience'),
      locations: this.store.query('location', {}),
      ageRanges: this.store.query('audiences-data', {
       type : 'AGE_RANGES'
      }),
      gender: this.store.query('audiences-data', {
       type : 'GENDER'
      }),
      errors: DS.Errors.create(),
      isSubmitted: false
    });
  },
  afterModel (model) {
    let session = this.get('session');
    let brandId = session.get('brandId');

    if (brandId) {
      this.store.find('brand', brandId).then((res) => {
        model.audience.set('brand', res);
      });
    } else {
      //this.transitionTo('welcome.brand');
    }
  },
  actions: {
    createTargetAudience () {
      if (this.validate()) {
        let audience = this.currentModel.audience;
        this.currentModel.set('isSubmitted', true);

        audience.save().then(() => {
          this.currentModel.set('isSubmitted', false);
          // should send to welcome.schedule but still not wired
          this.transitionTo('home');
        }, () => {
          this.currentModel.set('isSubmitted', false);
        });
      }
    },
    selectLocation (value) {
      value.forEach((item) => {
          let location = this.get('store').peekRecord('location',item);
          this.currentModel.audience.get('locations').pushObject(location);
      });
    },
    selectGender (value) {
      value.forEach((item) => {
          let gender = this.get('store').peekRecord('gender', item);
          this.currentModel.audience.get('genders').pushObject(gender);
      });
    },
    selectAgeRange (value) {
      value.forEach((item) => {
          let ageRange = this.get('store').peekRecord('age-range', item);
          this.currentModel.audience.get('ageRanges').pushObject(ageRange);
      });
    }
  },
  validate() {
//    let audience = this.currentModel.audience;
    let errors = this.currentModel.errors;

//    if (!company.get('name')) {
//      errors.add('name', 'Please enter company name');
//    } else {
//      errors.remove('name');
//    }

    return errors.get('isEmpty');
  }
});
