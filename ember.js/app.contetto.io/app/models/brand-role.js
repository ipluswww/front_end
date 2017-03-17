import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  name: attr('string'),
  viewAnalytics: attr('to-boolean'),
  createPosts: attr('to-boolean'),
  manageReviewStructure: attr('to-boolean'),
  manageSocialAccounts: attr('to-boolean'),
  overrideReviewStructure: attr('to-boolean'),
  reviewPosts: attr('to-boolean'),
  manageTeam: attr('to-boolean'),
  brand: belongsTo('brand')
});
