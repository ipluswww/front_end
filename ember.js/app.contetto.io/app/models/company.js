import DS from 'ember-data';
import ContettoValidations from 'contetto-fe/mixins/contetto-validations';

const {
  attr,
  hasMany,
} = DS;

export default DS.Model.extend(ContettoValidations, {
  about: attr('string'),
  address: attr('string'),
  city: attr('string', {defaultValue: '-'}),
  name: attr('string'),
  owner: attr('string'),
  phone: attr('string'),
  state: attr('string', {defaultValue: '-'}),
  invites: hasMany('invite'),
  province: attr('string'),
  country: attr('string', {defaultValue: '-'}),
  companyRoles: hasMany('companyRole'),
  companyMembers: hasMany('companyMember'),
  brands: hasMany('brand'),

  validations: {
    name: {
      presence: true,
    },
    about: {
      presence: true,
    },
    city: {
      presence: true,
    },
    address: {
      presence: true,
    },
    phone: {
      phone: true,
    },
    state: {
      presence: true,
    },
    country: {
      presence: true,
    },
    province: {
      presence: true,
    }
  }
});
