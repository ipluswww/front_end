import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('campaign-calendar', 'Integration | Component | campaign calendar', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{campaign-calendar}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#campaign-calendar}}
      template block text
    {{/campaign-calendar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
