import Ember from 'ember';
import ContettoValidationsMixin from 'contetto-fe/mixins/contetto-validations';
import { module, test } from 'qunit';

module('Unit | Mixin | contetto validations');

// Replace this with your real tests.
test('it works', function(assert) {
  let ContettoValidationsObject = Ember.Object.extend(ContettoValidationsMixin);
  let subject = ContettoValidationsObject.create();
  assert.ok(subject);
});
