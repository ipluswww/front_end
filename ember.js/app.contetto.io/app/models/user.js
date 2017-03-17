//import Ember from "ember";
import DS from "ember-data";
import ContettoValidations from 'contetto-fe/mixins/contetto-validations';
import Ember from 'ember';

const {
  computed,
} = Ember;

const {
  attr,
  hasMany,
} = DS;

export default DS.Model.extend(ContettoValidations, {
  	about: attr('string'),
  	address: attr('string'),
  	city: attr('string'),
  	country: attr('string'),
  	email: attr('string'),
  	password: attr('string'),
  	firstName: attr('string'),
  	lastName: attr('string'),
  	phoneNumber: attr('string'),
  	username: attr('string'),
  	state: attr('string'),
  	postalCode: attr('string'),
  	newPassword: attr('string'),
  	oldPassword: attr('string'),
  	cnfPassword: attr('string'),
    invites: hasMany('invite'),

    fullName: computed('firstName', 'lastName', function() {
      return [
        this.get('firstName'),
        this.get('lastName'),
      ].join(' ');
    }),

    validations: {
      firstName: {
        presence: true
      },
      lastName: {
        presence: true
      },
      about: {
        presence: true
      },
      phoneNumber: {
        presence: true
      },
      address: {
        presence: true
      },
      city: {
        presence: true
      },
      state: {
        presence: true
      },
      country: {
        presence: true
      },
      postalCode: {
        presence: true
      },
      email: {
				presence: true,
        email: true
      },
      password: {
        presence: true
      }
    }
});
