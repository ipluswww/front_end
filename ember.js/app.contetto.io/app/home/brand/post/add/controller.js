import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  content: '',

  myDate: Ember.computed(function() {
    return moment(moment.now()).format('YYYY-MM-DD');
  }),

  myTime: Ember.computed(function() {
    return moment(moment.now()).format('hh:mm:ss');
  }),

  datetime: Ember.computed('myDate', 'myTime', function() {
    let formatedDate =  moment(this.get('myDate')).format('YYYY-MM-DD');

    return new Date(`${formatedDate} ${this.get('myTime')}`).toISOString();
  }),

  actions: {
    contentChanged(content) {
      this.set('content', content);
    },

    save(status) {

      if(this.validate()) {

        switch(status) {
          case 'darft':
            this.socialpost(true, false, false);
            break;
          case 'task':
            this.socialpost(false, true, false);
            break;
          case 'schedulePost':
            this.socialpost();
            break;
          case 'reviewRequest':
            this.socialpost(false, false, true);
            break;
          default:
            return false;
        }
      }
    },

    cancel() {
      this.setProperties({
        title: '',
        content: '',
        date: ''
      });
    }
  },

  socialpost(isDraft, isApproved, reviewStatus) {
    let _this =this;
    const brandId = this.get('model.brandId');
    const brand = this.store.peekRecord('brand', brandId);
    // const title = this.get('title');
    const content = this.get('content');
    const datetime = this.get('datetime');
    const campaignId = this.get('campaign');
    const campaign = this.store.peekRecord('campaign', campaignId);
    let socialAccounts = [];


    for(let d of this.get('account')) {
      let modifiedAccount = this.store.peekRecord('social-account', d);

      modifiedAccount.set('startTime', _this.get('datetime'));
      socialAccounts.pushObject(modifiedAccount);
    }

    let data = {
      content: content,
      type: 'marketing',
      isDraft: isDraft,
      isApproved: isApproved,
      reviewStatus: reviewStatus,
      brand: brand,
      datetime: datetime,
      socialAccounts: socialAccounts,
      campaign: campaign
    };

    this.store.createRecord('posting', data).save().then(() => {
      this.get('toast').success('Post has been successfully been created.');
    });
  },

  validate () {

    if(!this.get('title')) {
      this.get('toast').error('Please enter title');
    } else if(!this.get('content')) {
      this.get('toast').error('Please enter content');
    } else if(new Date(this.get('datetime')).getTime() < new Date().getTime()) {
      this.get('toast').error('Selected date should not be past date');
    } else if(Ember.isEmpty(this.get('account'))) {
       this.get('toast').error('Please choose the accounts.');
    } else {
      return true;
    }
  }
});
