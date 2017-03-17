import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
	actions: {
    filterCat(val){
      let _this = this;
      let cat = this.get('model').filters.categories.findBy("cat", val);
      let filteredItems = [];

      if(cat.get('isChecked')) {
        cat.set("isChecked", false);
      } else  {
        cat.set("isChecked", true);
      }

      this.get('model').allEvents.forEach(function(item){
				let cat = _this.get('model').filters.categories.findBy("cat", item.className);

				if(cat.get('isChecked')) {
          filteredItems.push(item);
        }
			});

      this.set('model.events',filteredItems);
    },

    filterType(val){
      let _this = this;
    	let types = this.get('model').filters.types.findBy("type", val);
      let filteredItems = [];

      if(types.get('isChecked')) {
        types.set("isChecked", false);
      } else {
        types.set("isChecked", true);
      }

    	this.get('model').allEvents.forEach(function(item){
				let type = _this.get('model').filters.types.findBy("type", item.type);

        if(type.get('isChecked')) {
          filteredItems.push(item);
        }
			});

    	this.set('model.events',filteredItems);
    },

    filterStatus(val){
      let _this = this;
    	let status = this.get('model').filters.status.findBy("status", val);
      let filteredItems = [];

      if(status.get('isChecked')) {
        status.set("isChecked", false);
      } else {
        status.set("isChecked", true);
      }

    	this.get('model').allEvents.forEach(function(item){
  			let status = _this.get('model').filters.status.findBy("status", item.status);

  			if(status.get('isChecked')) {
          filteredItems.push(item);
        }
      });

    	this.set('model.events',filteredItems);
    },

    filterName(val){
      let _this = this;
      let status = _this.get('model').filters.campaignA.findBy("campaignName", val);
      let filteredItems = [];

      if(status.isChecked) {
        status.set("isChecked", false);
      } else {
        status.set("isChecked", true);
      }

      this.get('model').allEvents.forEach(function(item){
        let status = _this.get('model').filters.campaignA.findBy("campaignName", item.campaignName);

        if(status.get('isChecked')) {
          filteredItems.push(item);
        }
      });

      this.set('model.events',filteredItems);
    },

    showDetail(event){
    	this.set('model.detail',Ember.Object.create({
        show: true,
        campaignId: event.campaignId,
        brandId: event.brandId,
        type: event.type,
        status: event.status,
        className: event.className,
        title: event.title,
        start: moment(parseInt(event.start)).format('MMMM Do YYYY'),
        end: moment(parseInt(event.end)).format('MMMM Do YYYY')
      }));
    },

    gotToDetail(event){
	    this.transitionToRoute('home.brand.campaign.details',{
        brand_id: event.brandId,
      	camp_id: event.campaignId
      });
    },

    closeDetail(){
    	this.set('model.detail',Ember.Object.create({
        show: false,
        campaignId:'',
        brandId:'',
        type:'',
        status:'',
        className:'',
        title: '',
        start:'',
        end: ''
      }));
    }
  }
});
