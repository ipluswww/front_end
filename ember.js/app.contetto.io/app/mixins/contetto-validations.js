import Ember from 'ember';
import Validations from 'ember-validations';
import config from 'ember-get-config';

const {
  RSVP: { all, reject },
  computed,
  computed: { not },
  get,
} = Ember;

export default Ember.Mixin.create(Validations, {
  disableValidations: false,

  validate() {
    const { environment } = config;

    if(this.get('disableValidations') && environment === 'development') {
      return new Promise(resolve => resolve());
    }

    return this._validate(arguments).then((vals) => {
      let errors = get(this, 'errors');

      if (vals.indexOf(false) > -1) {
        return reject(errors);
      }

      return errors;
    });
  },

  _validate(attributes) {
    let validators = this.validators;
    if (attributes.length) {
      let validatorsArray = [];

      Object.keys(attributes).forEach(key => {
        validatorsArray.push(this.validators.findBy('property', attributes[key]));
      });

      validators = new Ember.A(validatorsArray);
      this.set('lastValidators', validators);
    } else {
      this.set('lastValidators', null);
    }

    let promises = validators.invoke('_validate').without(undefined);
    return all(promises);
  },

  isValid: computed('validators.@each.isValid', 'lastValidators', function() {
    let compactValidators = get(this, 'validators').compact();
    if (this.get('lastValidators')) {
      compactValidators = get(this, 'lastValidators').compact();
    }

    let filteredValidators = compactValidators.filter((validator) => !get(validator, 'isValid'));

    return get(filteredValidators, 'length') === 0;
  }),

  isInvalid: not('isValid')
});
