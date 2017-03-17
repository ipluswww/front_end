import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('inbox-nav-menu', 'Integration | Component | inbox nav menu', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{inbox-nav-menu}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#inbox-nav-menu}}
      template block text
    {{/inbox-nav-menu}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
