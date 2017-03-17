import DS from "ember-data";
import ContettoValidations from 'contetto-fe/mixins/contetto-validations';

const {
  attr,
  belongsTo,
} = DS;

export default DS.Model.extend(ContettoValidations, {
  email: attr('string'),
  roleId: attr('string'),
  company: belongsTo('company'),
  user: belongsTo('user'),
  role: belongsTo('companyRole'),

  validations: {
    email: {
      presence: true,
      email: true,
    },
    roleId: {
      presence: true,
    },
    company: {
      presence: true,
    },
    user: {
      presence: true,
    },
    role: {
      presence: true,
    },
  }
});
