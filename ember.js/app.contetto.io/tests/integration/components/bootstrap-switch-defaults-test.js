import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bootstrap-switch-defaults', 'Integration | Component | bootstrap switch defaults', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bootstrap-switch-defaults}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bootstrap-switch-defaults}}
      template block text
    {{/bootstrap-switch-defaults}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
