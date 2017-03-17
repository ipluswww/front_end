import DS from "ember-data";

const {attr, belongsTo} = DS;

export default DS.Model.extend({
  email: attr('string'),
  type: attr('string'),
  status: attr('string'),
  text: attr('string'),
  user: belongsTo('user'),
  company: belongsTo('company'),
  brand: belongsTo('brand'),
  role: belongsTo('companyRole')
});
