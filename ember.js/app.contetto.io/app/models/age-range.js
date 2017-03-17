import DS from "ember-data";
import ContettoValidations from 'contetto-fe/mixins/contetto-validations';

const {
  attr,
} = DS;

export default DS.Model.extend(ContettoValidations, {
  name: attr('string'),

  validations: {
    presence: true,
  },
});
