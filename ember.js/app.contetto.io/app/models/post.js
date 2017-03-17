import DS from "ember-data";

import ContettoValidations from 'contetto-fe/mixins/contetto-validations';

const {
  attr,
  belongsTo,
} = DS;

export default DS.Model.extend(ContettoValidations, {
  brand: belongsTo('brand'),
  content: attr('string'),
  type : attr('string'),
	/*goalID: attr('string'),
	brandID: attr('string'),
  	title: attr('string'),
  	content: attr('string'),
  	isDraft: attr('boolean'),
  	isApproved: attr('boolean'),
  	platform: attr('string'),
  	reviewStatus: attr('boolean'),
  	time : attr('string'),
  	eventName: attr('string'),
  	description: attr('string'),
  	summary: attr('string'),
  	dates: attr('string'),
  	startTime: attr('string'),
  	endTime: attr('string'),
  	interval: attr('number'),
  	frequency: attr('number'),
  	recurs: attr('boolean')*/

	validations: {},
});
