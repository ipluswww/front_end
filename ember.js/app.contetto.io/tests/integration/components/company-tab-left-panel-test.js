import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('company-tab-left-panel', 'Integration | Component | company tab left panel', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{company-tab-left-panel}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#company-tab-left-panel}}
      template block text
    {{/company-tab-left-panel}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
