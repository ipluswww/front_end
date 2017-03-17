import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({
   keyForAttribute: function(attr) {
         return attr;
   }
});
