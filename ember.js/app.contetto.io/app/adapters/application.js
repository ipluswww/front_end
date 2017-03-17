import Ember from 'ember';
import DS from 'ember-data';
import config from './../config/environment';

import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

const ApplicationAdapter = DS.JSONAPIAdapter.extend(DataAdapterMixin, {
 authorizer: 'authorizer:contetto',
 toast: Ember.inject.service(),
 host: config.REST.host,
 // namespace: config.REST.namespace,
 headers: Ember.computed('session.X-Session', function() {
  let headers = {
   "Content-Type": "application/vnd.api+json"
  };

  return headers;
 }),

 handleResponse(status, headers, payload, requestData) {
  console.log(requestData.url, payload);

  if (status === 400 || status === 0) {
   const errorMessage = payload.title || 'Something went wrong';
   this.get('toast').error(errorMessage, 'Error');
  }

  if (payload === null && status === 200) {
   payload = {
    data: []
   };
  }

  if (requestData.url.indexOf('invites/v1/invites') !== -1) {
   console.log(payload);
  }

  return payload;
 },

 createRecord(store, type, snapshot) {
  if (type.modelName === "reset-password") {
   let data = {};
   let serializer = store.serializerFor(type.modelName);
   let url = this.buildURL(type.modelName, null, snapshot, 'createRecord');

   serializer.serializeIntoHash(data, type, snapshot, {
    includeId: true
   });

   return this.ajax(url, "PATCH", {
    data: data
   });
  } else {
   return this._super(...arguments);
  }
 },

 pathForType: function(type) {
  switch (type) {
   case 'user':
    return 'users/v1/users';
   case 'session':
    return 'users/v1/sessions';
   case 'verification':
    return 'users/v1/verifications';
   case 'company':
    return 'companies/v1/companies';
   case 'company-member':
    return 'companies/v1/companyMembers';
   case 'invite':
    return 'invites/v1/invites';
   case 'company-invite':
    return 'invites/v1/invites';
   case 'brand':
    return 'brands/v1/brands';
   case 'brand-member':
    return 'brands/v1/brandMembers';
   case 'campaign':
    return 'campaigns/v1/campaigns';
   case 'audiences-data':
    return 'audiences/v1/data';
   case 'location':
    return 'audiences/v1/locations';
   case 'audience':
    return 'audiences/v1/audiences';
   case 'post':
    return 'postings/v1/postings';
   case 'posting':
    return 'postings/v1/postings';
   case 'invite-confirm':
    return 'invites/v1/accepting';
   case 'forgot-password':
    return 'users/v1/reset';
   case 'social-account':
    return 'social-accounts/v1/accounts';
   case 'brand-role':
    return 'roles/v1/brands';
   case 'company-role':
    return 'roles/v1/companies';
   case 'category':
    return 'categories/v1/categories';
   case 'goal':
    return 'goals/v1/goals';
  }

  return Ember.String.underscore(type);
 },

 updateRecord(store, type, snapshot) {

  if (type.modelName === "company-member" || type.modelName === "brand-member") {
   return this._super(store, type, snapshot);
  } else {
   const payload = {
    data: {
     id: snapshot.id,
     type: snapshot.modelName + 's',
     attributes: {}
    }
   };
   const changedAttributes = snapshot.changedAttributes();

   Object.keys(changedAttributes).forEach((attributeName) => {
    const newValue = changedAttributes[attributeName][1];
    // Do something with the new value and the payload
    // This will depend on what your server expects for a PATCH request
    payload.data.attributes[attributeName] = newValue;
   });

   let serializer = store.serializerFor(type.modelName);

   serializer.serializeIntoHash(payload, type, snapshot);

   const id = snapshot.id;
   const url = this.buildURL(type.modelName, id, snapshot, 'updateRecord');

   return this.ajax(url, 'PATCH', {
    data: payload
   });
  }
 },

 query(store, type, query) {
  var proc = 'GET',
   url = this.buildURL(type.modelName),
   theFinalQuery = url + "?" + Ember.$.param(query);
  return this.ajax(theFinalQuery, proc);
 }

});

export default ApplicationAdapter;