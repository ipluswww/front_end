import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  name: attr('string'),
  startDate: attr('string'),
  endDate: attr('string'),
  brand: belongsTo('brand')
});
