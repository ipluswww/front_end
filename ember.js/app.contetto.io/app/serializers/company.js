import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({
	keyForRelationship(key){
    return key;
  }
});
