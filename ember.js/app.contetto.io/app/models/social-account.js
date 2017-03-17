import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  title: attr('string'),
  platform: attr('string'),
  token: attr('string'),
  tokenSecret: attr('string'),
  pageId: attr('string'),
  pageTitle: attr('string'),
  startTime: attr('date'),
  endTime: attr('date'),
  brand: belongsTo('brand'),
  postings: belongsTo('posting'),
});
