import Ember from 'ember';

export default Ember.Component.extend({

 _initializeCalendar: (function() {
  var self = this;
  return Ember.$("#campaignCalendar").fullCalendar({
   header: {
    left: 'prev,next today',
    center: 'title',
    right: 'month,agendaWeek,agendaDay'
   },
   defaultDate: Date.now(),
   editable: false,
   //eventLimit: true, // allow "more" link when too many events
   events: self.theEvents,
   eventClick: function(event) {
    console.log(`${event.title} was clicked!`);
   }
  });
 }).on("didInsertElement"),
});