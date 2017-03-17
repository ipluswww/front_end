import Ember from 'ember';

export default Ember.Route.extend({
 model() {
  return Ember.Object.create({
   isNew: true,

  });
 },
 actions: {
  test() {
   console.log(this.currentModel.get('isNew'));
   this.currentModel.set('isNew', true);
   //console.log(this.isNew);
  },
  test2() {
   this.currentModel.set('isNew', false);
   //console.log(this.isNew);
  }
 }
});