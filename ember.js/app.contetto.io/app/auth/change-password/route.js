import Ember from 'ember';

const {
 inject: {
  service
 }
} = Ember;

export default Ember.Route.extend({
 ajax: service(),

 model(params) {
  return Ember.Object.create({
   error: false,
   token: params.token,
   newPassword: '',
   confirmPassword: '',
   success: false,
   isSubmitted: false
  });
 },

 actions: {
  resetPassword() {
   const url = 'users/v1/pass';
   const data = {
    'data': {
     'attributes': {
      'newPassword': this.currentModel.get('newPassword'),
      'token': this.currentModel.token
     }
    }
   };

   if (this.validate()) {
    this.currentModel.set('isSubmitted', true);

    this.get('ajax').request(url, {
     method: 'PATCH',
     contentType: 'application/json',
     data: JSON.stringify(data)
    }).then(() => {
     this.currentModel.set('success', true);
     this.currentModel.set('isSubmitted', false);
    });
   }
  }
 },

 validate() {
  const newPassword = this.currentModel.get('newPassword');
  const confirmPassword = this.currentModel.get('confirmPassword');

  if (Ember.isEmpty(newPassword) || Ember.isEmpty(confirmPassword)) {
   this.currentModel.set('error', 'Password should not be empty');
   return false;
  } else if (newPassword !== confirmPassword) {
   this.currentModel.set('error', 'New password and confirm password must be same.');
   return false;
  } else {
   this.currentModel.set('error', false);
   return true;
  }
 }
});