import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  createdDateTime: attr('date'),
  description: attr('string'),
  title: attr('string'),
  brand: belongsTo('brand')
});
