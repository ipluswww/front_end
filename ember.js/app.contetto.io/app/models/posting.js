import DS from "ember-data";
const {attr, belongsTo, hasMany} = DS;

export default DS.Model.extend({
  brand: belongsTo('brand'),
  socialAccounts: hasMany('social-account'),
  campaign: belongsTo('campaign'),
  title: attr('string'),
  type: attr('string'),
  content: attr('string'),
  createdAt: attr('string'),
  isApproved: attr('to-boolean'),
  isDraft: attr('to-boolean'),
  postedAt: attr('string'),
  published: attr('boolean'),
  reviewStatus: attr('to-boolean')
});
