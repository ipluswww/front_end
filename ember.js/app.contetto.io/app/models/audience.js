import DS from "ember-data";
import ContettoValidations from 'contetto-fe/mixins/contetto-validations';

const {
  attr,
  belongsTo,
  hasMany,
} = DS;

export default DS.Model.extend(ContettoValidations, {
  ageRanges: hasMany('age-range'),
  genders: hasMany('gender'),
  locations: hasMany('location'),
  brand: belongsTo('brand'),
  title: attr('string', {
    defaultValue: 'New target!'
  }),

  validations: {
    ageRanges: {
      presence: true,
    },
    genders: {
      presence: true,
    },
    locations: {
      presence: true,
    },
    brand: {
      presence: true,
    },
    title: {
      presence: true,
    },
  }
});
