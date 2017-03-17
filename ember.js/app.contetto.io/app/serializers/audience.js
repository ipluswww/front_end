import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({
  keyForRelationship(key){

    if (key === 'brand') {
      return 'brands';
    }

    return key;
  }
});
