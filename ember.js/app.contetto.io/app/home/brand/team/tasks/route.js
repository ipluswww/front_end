import Ember from 'ember';
var _task=[{DueDate:"03-16-16",CreatedBy:"Dan",AssignedTo:"Sam",Status:"Overdue",Subject:"New Content"},
{DueDate:"03-15-16",CreatedBy:"Caitlyn",AssignedTo:"Pat",Status:"In Progress",Subject:"New Pictures"},
{DueDate:"03-16-16",CreatedBy:"Samntha",AssignedTo:"Sam",Status:"Overdue",Subject:"Staff Training"},
{DueDate:"03-16-16",CreatedBy:"Dan",AssignedTo:"Sam",Status:"Overdue",Subject:"New Content"}];
const BrandTeamActivityRoute = Ember.Route.extend({
	model () {
    		return Ember.RSVP.hash({
      			task:_task,
      			isTeamTasksActive: true
    		});
  	}
});

export default BrandTeamActivityRoute;
