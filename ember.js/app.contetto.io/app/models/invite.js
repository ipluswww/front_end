import DS from "ember-data";

const {
  attr,
  belongsTo,
} = DS;
import ContettoValidations from 'contetto-fe/mixins/contetto-validations';

/* Brand invite*/
export default DS.Model.extend(ContettoValidations, {
  email: attr('string'),
  type: attr('string'),
  status: attr('string'),
  text: attr('string'),
  user: belongsTo('user'),
  company: belongsTo('company'),
  brand: belongsTo('brand'),
  role: belongsTo('brandRole'),

  validations: {
    email: {
      presence: true,
      email: true,
    },
    type: {
      presence: true,
    },
    status: {
      presence: true,
    },
    text: {
      presence: true,
    },
    user: {
      presence: true,
    },
    company: {
      presence: true,
    },
    brand: {
      presence: true,
    },
    role: {
      presence: true,
    },
  }
});
