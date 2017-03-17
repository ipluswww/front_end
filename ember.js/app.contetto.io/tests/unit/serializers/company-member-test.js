import { moduleForModel, test } from 'ember-qunit';

moduleForModel('company-member', 'Unit | Serializer | company member', {
  // Specify the other units that are required for this test.
  needs: ['serializer:company-member']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
