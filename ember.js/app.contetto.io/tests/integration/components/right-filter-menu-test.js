import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('right-filter-menu', 'Integration | Component | right filter menu', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{right-filter-menu}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#right-filter-menu}}
      template block text
    {{/right-filter-menu}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
