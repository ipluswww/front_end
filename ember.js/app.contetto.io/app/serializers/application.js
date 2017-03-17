import Ember from 'ember';
import DS from 'ember-data';

const ApplicationSerializer = DS.JSONAPISerializer.extend({
  keyForAttribute: function(key) {
    return Ember.String.camelize(key);
  }

   /*serializeIntoHash: function(hash, type, record, options) {
     return Ember.merge(hash, this.serialize(record, options));
   },
   normalizeSaveResponse: function (store, primaryModelClass, payload, id, requestType) {
    var data = {
      user: payload.data.attributes
    };
    data.user.id = payload.data.id;

    return this._super(store, primaryModelClass, data, id, requestType);
   }*/
});

export default ApplicationSerializer;
