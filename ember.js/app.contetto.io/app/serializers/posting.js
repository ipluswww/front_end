import Ember from 'ember';
import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({
	keyForAttribute: function(attr) {
		return attr;
  },

  keyForRelationship(key) {
    if (key === 'socialAccounts') {
      return 'accounts';
    }

    return this._super(...arguments);
  },

  serializeHasMany (snapshot, json, relationship) {
    let _this = this;
    let datetime = snapshot.record.datetime;
    let key = relationship.key;
    let data = [];

    if (this._canSerialize(key)) {
      let hasMany = snapshot.hasMany(key);

      if (hasMany !== undefined && hasMany !== null && !Ember.isEmpty(hasMany)) {
        json.relationships = json.relationships || {};

        var payloadKey = this._getMappedKey(key, snapshot.type);

        if (payloadKey === key) {
          payloadKey = this.keyForRelationship(key, 'hasMany', 'serialize');
        }


        if (hasMany) {

          hasMany.forEach(function(hm) {

            data.pushObject({
              type: _this.payloadKeyFromModelName(hm.modelName),
              id: hm.id,
              attributes: {
                startTime: datetime
              }
            });
          });
        }

        json.relationships[payloadKey] = { data };
      }
    }
  },

  serializeBelongsTo(snapshot, json, relationship) {
    let key = relationship.key;

    if (this._canSerialize(key)) {
      let belongsTo = snapshot.belongsTo(key);

      if (belongsTo !== undefined && belongsTo !== null && !Ember.isEmpty(belongsTo)) {

        json.relationships = json.relationships || {};

        var payloadKey = this._getMappedKey(key, snapshot.type);
        if (payloadKey === key) {
          payloadKey = this.keyForRelationship(key, 'belongsTo', 'serialize');
        }

        let data = null;
        if (belongsTo) {
          data = {
            type: this.payloadKeyFromModelName(belongsTo.modelName),
            id: belongsTo.id
          };
        }

        json.relationships[payloadKey] = { data };
      }
    }
  }
});
