import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('campaign-tabs', 'Integration | Component | campaign tabs', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{campaign-tabs}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#campaign-tabs}}
      template block text
    {{/campaign-tabs}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
