import DS from 'ember-data';
import ContettoValidations from 'contetto-fe/mixins/contetto-validations';

const {
  attr,
  belongsTo,
  hasMany,
} = DS;

export default DS.Model.extend(ContettoValidations, {
  /* taken from back end service */
  subject: attr('string'),
  assignedTo: belongsTo('user'),
  company: belongsTo('company'),
  status: attr('string'),
  dueDate: attr('date'),
  createdBy: belongsTo('user'),
  createdAt: attr('date'),
  description: attr('string'),
  /* taken from mock up */
  tags: attr('string'),
  category: attr('string'),
  dependencies: hasMany('task'),

  validations: {
    subject: {
      presence: true,
    },
    assignedTo: {
      presence: true,
    },
    company: {
      presence: true,
    },
    status: {
      presence: true,
    },
    dueDate: {
      presence: true,
    },
    createdBy: {
      presence: true,
    },
    createdAt: {
      presence: true
    },
    description: {
      presence: true,
    },
    tags: {
      presence: true,
    },
    category: {
      presence: true,
    },
    dependencies: {
      presence: true,
    },
  }
});
