import Ember from 'ember';
import Base from 'ember-validations/validators/base';
import Messages from 'ember-validations/messages';

Messages.defaults.email = "is not a valid email";

const RE_EMAIL = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;

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
      set(this, 'options.message', Messages.render('email', this.options));
    }
  },
  call: function() {
    /*jshint expr:true*/
    if (Ember.isEmpty(get(this.model, this.property))) {
      if (this.options.allowBlank === undefined) {
        this.errors.pushObject(this.options.message);
      }
    } else if (!RE_EMAIL.test(get(this.model, this.property))) {
      this.errors.pushObject(this.options.message);
    }
  }
});
