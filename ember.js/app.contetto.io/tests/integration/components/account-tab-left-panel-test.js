import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('account-tab-left-panel', 'Integration | Component | account tab left panel', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{account-tab-left-panel}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#account-tab-left-panel}}
      template block text
    {{/account-tab-left-panel}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
