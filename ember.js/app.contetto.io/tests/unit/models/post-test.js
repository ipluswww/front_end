import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('post', 'Unit | Model | post', {
  // Specify the other units that are required for this test.
  needs: []
});


test('it exists', function(assert){
  var post = this.subject({Title: 'Damien', Content: 'White'});

  Ember.run(function() {
    post.set('Title', 'Dave');
  });

  assert.equal(post.get('Title'), 'Dave');

  Ember.run(function() {
    post.set('Content', 'Marini');
  });

  assert.equal(post.get('Content'), 'Marini');
});
