import Ember from 'ember';
import moment from 'moment';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const BrandCampaignListRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
  model () {
    let brand_id = this.modelFor('home.brand').brand_id;

    let defaultStatus = Ember.A([
      Ember.Object.create({key:0,val:'Pending'}),
      Ember.Object.create({key:1,val:'Active'}),
      Ember.Object.create({key:2,val:'Complete'}),
      Ember.Object.create({key:3,val:'Cancelled'}),
    ]);

    let defaultCats = Ember.A([
      Ember.Object.create({key:'cat1',val:'Category 1'}),
      Ember.Object.create({key:'cat2',val:'Category 2'}),
      Ember.Object.create({key:'cat3',val:'Category 3'})
    ]);

    let defaultTypes = Ember.A([
      Ember.Object.create({key:0,val:'Marketing'}),
      Ember.Object.create({key:1,val:'Engagement'})
    ]);

    let getRandomColor = function() {
      let letters = '0123456789ABCDEF';
      let color = '#';

      for (let i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }

      return color;
    };

    let eventsArr = Ember.A([]);
    let typesArr = Ember.A([]);
    let catssArr = Ember.A([]);
    let statusArr = Ember.A([]);
    let campaignArr = Ember.A([]);

    return Ember.RSVP.hash({
      currDate: moment().format('YYYY-MM-DD h:mm a'),
      allEvents:eventsArr,
      events:eventsArr,
      filters:Ember.Object.create({
        status:statusArr,
        types:typesArr,
        categories:catssArr,
        campaignA:campaignArr,
      }),
      headerObj:Ember.Object.create({
        left: "prev,next today",
        center: "title",
        right: "month,agendaWeek,agendaDay"
      }),
      campaigns:this.store.query('campaign',{'brandId':brand_id}).then((recs) => {

        recs.forEach (function (rec) {
          console.log(rec.get('id'));
          console.log(rec.get('brand').get('id'));

          let cpColor = getRandomColor();

          campaignArr.push(Ember.Object.create({
            campaignName:rec.get('name'),
            isChecked:true,
            bgColor:cpColor
          }));

          eventsArr.push({
            isChecked:true,
            campaignName:rec.get('name'),
            campaignId:rec.get('id'),
            brandId:rec.get('brand').get('id'),
            type:rec.get('type'),
            status:rec.get('status'),
            backgroundColor:cpColor,
            className:'',
            title: rec.get('name') +' [ '+ defaultStatus.findBy('key',rec.get('status')).val +' ] '+ moment(rec.get('startTime')).format('h:mm a'),
            start: moment(rec.get('startTime')).format('YYYY-MM-DD HH:mm:ss'),
            end: moment(rec.get('endTime')).format('YYYY-MM-DD HH:mm:ss'),
            allDay:false
          });

          if(typesArr.findBy('type',rec.get('type')) === undefined ) {

            typesArr.push(
              Ember.Object.create({
                type: defaultTypes.findBy('key',rec.get('type')).key,
                val: defaultTypes.findBy('key',rec.get('type')).val,
                isChecked:true
              })
            );
          }

          if(catssArr.findBy('cat',rec.get('category')) === undefined ) {

            catssArr.push(
              Ember.Object.create({
                cat: defaultCats.findBy('key',rec.get('category')).key,
                val: defaultCats.findBy('key',rec.get('category')).val,
                isChecked:true
              })
            );
          }

          if(statusArr.findBy('status',rec.get('status')) === undefined ) {
            statusArr.push(
              Ember.Object.create({
                status: defaultStatus.findBy('key',rec.get('status')).key,
                val: defaultStatus.findBy('key',rec.get('status')).val,
                isChecked: true
              })
            );
          }

        });
      }, function () { // <-- callback
        console.log ('findAll Scenario failed');
      }),
      detail: Ember.Object.create({
        show: false,
        campaignId:'',
        brandId:'',
        type:'',
        status:'',
        className:'',
        title: '',
        start:'',
        end: ''
      })
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    //Some modifications
    //..
    //end of modificaitons
    controller.set('model', model);
  }
});

export default BrandCampaignListRoute;
