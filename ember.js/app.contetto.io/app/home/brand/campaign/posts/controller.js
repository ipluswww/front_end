import Ember from 'ember';
import moment from 'moment';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Ember.Controller.extend({

  // filtered Records
  filteredContent: [],

  pagedContent: pagedArray('content.posts', {infinite: "unpaged",perPage: 3}),

  actions: {
    filterStartDate(dat) {
      this.set('model.filters.startD', dat.getTime());

      if(!Ember.isEmpty(this.get('model.filters.endD'))) {
        let filteredItems = [];

        this.get('model.posts').forEach((item) => {

          if((moment(moment.utc(item.get('createdAt')).format("YYYY-MM-DD")).unix()*1000) >= this.get('model.filters.startD') &&
            (moment(moment.utc(item.get('createdAt')).format("YYYY-MM-DD")).unix()*1000) <= this.get('model.filters.endD')) {

            if(!Ember.isEmpty(this.get('model.filters.isApproved')) &&
              !Ember.isEmpty(this.get('model.filters.type'))) {

              if(item.get('type') === this.get('model.filters.type') &&
                item.get('isApproved').toString() === this.get('model.filters.isApproved')) {

                filteredItems.push(item);
              }
            } else if (!Ember.isEmpty(this.get('model.filters.type'))) {

              if(item.get('type') === this.get('model.filters.type')) {

                filteredItems.push(item);
              }
            } else {
              filteredItems.push(item);
            }
          }
        });

        /*console.log(filteredItems);*/
        this.set('filteredContent',filteredItems);
        this.set('pagedContent',pagedArray('filteredContent', {infinite: "unpaged",perPage: 3}));
      }
    },

    filterEndDate(dat) {
      this.set('model.filters.endD', dat.getTime());

      if(!Ember.isEmpty(this.get('model.filters.startD'))){
        let filteredItems = [];

        this.get('model.posts').forEach((item) => {

          if((moment(moment.utc(item.get('createdAt')).format("YYYY-MM-DD")).unix()*1000) >= this.get('model.filters.startD') &&
            (moment(moment.utc(item.get('createdAt')).format("YYYY-MM-DD")).unix()*1000) <= this.get('model.filters.endD')) {

            if(!Ember.isEmpty(this.get('model.filters.isApproved')) && !Ember.isEmpty(this.get('model.filters.type'))) {

              if(item.get('type') === this.get('model.filters.type') &&
                item.get('isApproved').toString() === this.get('model.filters.isApproved')) {

                filteredItems.push(item);
              }

            }else if (!Ember.isEmpty(this.get('model.filters.type'))) {

              if(item.get('type') === this.get('model.filters.type')) {

                filteredItems.push(item);
              }
            }else {
              filteredItems.push(item);
            }
          }
        });

        /*console.log(filteredItems);*/
        this.set('filteredContent',filteredItems);
        this.set('pagedContent',pagedArray('filteredContent', {infinite: "unpaged",perPage: 3}));
      }
    },

    filterType(val) {
      this.set('model.filters.type', val);

      let filteredItems = [];

      this.get('model.posts').forEach((item) => {

        if(!Ember.isEmpty(this.get('model.filters.startD')) && !Ember.isEmpty(this.get('model.filters.endD'))) {

          if((moment(moment.utc(item.get('createdAt')).format("YYYY-MM-DD")).unix()*1000) >= this.get('model.filters.startD') &&
            (moment(moment.utc(item.get('createdAt')).format("YYYY-MM-DD")).unix()*1000) <= this.get('model.filters.endD')) {

            if(!Ember.isEmpty(this.get('model.filters.isApproved')) && !Ember.isEmpty(this.get('model.filters.type'))) {

              if(item.get('type') === this.get('model.filters.type') &&
                item.get('isApproved').toString() === this.get('model.filters.isApproved')) {

                filteredItems.push(item);
              }
            }else if (!Ember.isEmpty(this.get('model.filters.type'))){

              if(item.get('type') === this.get('model.filters.type')) {

                filteredItems.push(item);
              }
            }else {
              filteredItems.push(item);
            }
          }
        }else{

          if(!Ember.isEmpty(this.get('model.filters.isApproved')) && !Ember.isEmpty(this.get('model.filters.type'))) {

            if(item.get('type') === this.get('model.filters.type') &&
              item.get('isApproved').toString() === this.get('model.filters.isApproved')) {

              filteredItems.push(item);
            }

          } else if(!Ember.isEmpty(this.get('model.filters.type'))) {

            if(item.get('type') === this.get('model.filters.type')) {

              filteredItems.push(item);
            }
          } else {
            filteredItems.push(item);
          }
        }
      });

      /*console.log(filteredItems);*/
      this.set('filteredContent',filteredItems);
      this.set('pagedContent',pagedArray('filteredContent', {infinite: "unpaged",perPage: 3}));
    },

    filterStatus(val) {
      this.set('model.filters.isApproved',val);

      /*console.log($this.get('model').filters.isApproved);
      console.log($this.get('model').filters.type);*/

      let filteredItems = [];

      this.get('model.posts').forEach((item) => {

        if(!Ember.isEmpty(this.get('model.filters.startD')) && !Ember.isEmpty(this.get('model.filters.endD'))){

          if((moment(moment.utc(item.get('createdAt')).format("YYYY-MM-DD")).unix()*1000) >= this.get('model.filters.startD') &&
            (moment(moment.utc(item.get('createdAt')).format("YYYY-MM-DD")).unix()*1000) <= this.get('model.filters.endD')) {

            if(!Ember.isEmpty(this.get('model.filters.isApproved')) && !Ember.isEmpty(this.get('model.filters.type'))) {

              if(item.get('isApproved').toString() === val &&
                item.get('type') === this.get('model.filters.type')) {

                filteredItems.push(item);
              }

            }else if (!Ember.isEmpty(this.get('model.filters.isApproved'))){

              if(item.get('isApproved').toString() === this.get('model.filters.isApproved')) {

                filteredItems.push(item);
              }
            }else{
              filteredItems.push(item);
            }
          }
        }else{

          if(!Ember.isEmpty(this.get('model.filters.isApproved')) && !Ember.isEmpty(this.get('model.filters.type'))){

            if(item.get('isApproved').toString() === val &&
              item.get('type') === this.get('model.filters.type')) {

              filteredItems.push(item);
            }

          }else if(!Ember.isEmpty(this.get('model.filters.isApproved'))){

            if(item.get('isApproved').toString() === this.get('model.filters.isApproved')) {

              filteredItems.push(item);
            }
          }else{
            filteredItems.push(item);
          }
        }
      });

      /*console.log(filteredItems);*/
      this.set('filteredContent',filteredItems);
      this.set('pagedContent',pagedArray('filteredContent', {infinite: "unpaged",perPage: 3}));
    },

    loadNext() {
      this.get('pagedContent').loadNextPage();
    }
  }
});
