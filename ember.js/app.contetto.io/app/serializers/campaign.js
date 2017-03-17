import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({
   	keyForAttribute: function(attr) {
        if(attr === 'startTime'){
			return 'startTime';
		}
		if(attr === 'endTime'){
			return 'endTime';
		}
		return attr;
   	},
	// normalizeResponse(store, primaryModelClass, payload, id, requestType) {
	// 	console.log(payload);
	// 	return this._super(store, primaryModelClass, payload, id, requestType);
	// }


});
