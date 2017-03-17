import { moduleFor, test} from 'ember-qunit';

moduleFor('controller:home/post', 'Unit | Controller | home/post', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('calling the action selectionlist updates platform', function(assert) { 
  var controller = this.subject();
  controller.send('selectlist', 'Testing params for social page');
  assert.equal(controller.get('platform'), 'Testing params for social page');
});

test('calling the action selectcampaign updates campaign', function(assert) {  
  var controller = this.subject();
  controller.send('selectcampaign', 'Testing params for campaign');
  assert.equal(controller.get('campaign'), 'Testing params for campaign');
});

test('calling the action selectcategory updates category', function(assert) {  
  var controller = this.subject();
  controller.send('selectcategory', 'Testing params for category');
  assert.equal(controller.get('category'), 'Testing params for category');
});



