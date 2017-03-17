import { moduleForModel, test} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('post', 'Post Model', {
  
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


test('it saves a record', function(assert) {  
  assert.expect(1);      
  const adapter = DS.Adapter.extend({
    createRecord() { return Ember.RSVP.resolve(); }
    
  });
  this.register('adapter:application', adapter);

  Ember.run(() => {
    const model = this.subject({title: 'Damien', content: 'White'});
    model.save().then(() => {
      assert.equal(model.get('title'), 'Damien');
     
    });
  });
});
