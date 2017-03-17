import DS from "ember-data";
import ContettoValidations from 'contetto-fe/mixins/contetto-validations';

const {
  attr,
  belongsTo,
  hasMany,
} = DS;

export default DS.Model.extend(ContettoValidations, {
  description: attr('string'),
  address: attr('string'),
  city: attr('string', {defaultValue: '-'}),
  name: attr('string'),
  phone: attr('string'),
  state: attr('string', {defaultValue: '-'}),
  postal: attr('string'),

  /* needs back-end relationship properly formatted */
  companyId: attr('string'),
  company: belongsTo('company'),
  brandRoles: hasMany('brand-role'),
  brandMembers: hasMany('brand-member'),
  socialAccounts: hasMany('socialAccounts'),
  campaigns: DS.hasMany('campaign'),
  categories: DS.hasMany('category'),

  validations: {
    description: {
      presence: true,
    },
    address: {
      presence: true,
    },
    city: {
      presence: true,
    },
    name: {
      presence: true,
    },
    phone: {
      presence: true,
      phone: true,
    },
    state: {
      presence: true,
    },
    postalCode: {
      presence: true,
    },
    company: {
      presence: true,
    }
  }
});
