import Ember from 'ember';
import Base from 'ember-validations/validators/base';
import Messages from 'ember-validations/messages';

Messages.defaults.phone = "is not a valid phone number";

const RE_PHONE = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

var get = Ember.get;
var set = Ember.set;

export default Base.extend({
  init: function() {
    this._super();

    /*jshint expr:true*/
    if (this.options === true) {
      this.options = {};
    }

    if (this.options.message === undefined) {
      set(this, 'options.message', Messages.render('phone', this.options));
    }
  },
  call: function() {
    /*jshint expr:true*/
    if (Ember.isEmpty(get(this.model, this.property))) {
      if (this.options.allowBlank === undefined) {
        this.errors.pushObject(this.options.message);
      }
    } else if (!RE_PHONE.test(get(this.model, this.property))) {
      this.errors.pushObject(this.options.message);
    }
  }
});
