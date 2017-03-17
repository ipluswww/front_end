import Ember from 'ember';

export default Ember.Mixin.create({  
  handleErrors(err) {
    let errors = this.currentModel.errors;

    Object.keys(err).forEach(attribute => {
      let error = err[attribute][0];
        if (error) {
          errors.add(attribute, err[attribute][0]);
        } else {
          errors.remove(attribute);
        }
    });
  }
});
