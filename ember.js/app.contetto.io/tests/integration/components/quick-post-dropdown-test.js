import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('quick-post-dropdown', 'Integration | Component | quick post dropdown', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{quick-post-dropdown}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#quick-post-dropdown}}
      template block text
    {{/quick-post-dropdown}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
