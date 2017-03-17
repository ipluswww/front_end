import Ember from 'ember';
import EmberOauth2ConfigInitializer from 'contetto-fe/initializers/ember-oauth2-config';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | ember oauth2 config', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  EmberOauth2ConfigInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
