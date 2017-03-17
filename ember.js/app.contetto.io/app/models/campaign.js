import DS from "ember-data";
const {attr, belongsTo, hasMany} = DS;

export default DS.Model.extend({
  brand: belongsTo('brand'),
  postings: hasMany('posting'),
  name: attr('string'),
  category:attr('string'),
  startTime:attr('number'),
  endTime:attr('number'),
  type: attr('number'),
  status: attr('number'),
  start: attr('string'),
  end: attr('string'),
  isDraft: attr('boolean'),
  mode: attr('number')
});
