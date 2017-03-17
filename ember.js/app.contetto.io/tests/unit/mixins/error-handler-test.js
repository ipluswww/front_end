import Ember from 'ember';
import ErrorHandlerMixin from 'contetto-fe/mixins/error-handler';
import { module, test } from 'qunit';

module('Unit | Mixin | error handler');

// Replace this with your real tests.
test('it works', function(assert) {
  let ErrorHandlerObject = Ember.Object.extend(ErrorHandlerMixin);
  let subject = ErrorHandlerObject.create();
  assert.ok(subject);
});
