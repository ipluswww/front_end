import DS from "ember-data";
import ContettoValidations from 'contetto-fe/mixins/contetto-validations';

const {
  attr
} = DS;

export default DS.Model.extend(ContettoValidations, {
  canonicalName: attr('string'),
  categoryId: attr('number'),
  countryCode: attr('string'),
  name: attr('string'),
  parentId: attr('number'),
  status: attr('string'),
  targetType: attr('string'),

  validations: {
    canonicalName: {
      presence: true,
    },
    categoryId: {
      presence: true,
    },
    countryCode: {
      presence: true,
    },
    name: {
      presence: true,
    },
    parentId: {
      presence: true,
    },
    status: {
      presence: true,
    },
    targetType: {
      presence: true,
    },
  }
});
