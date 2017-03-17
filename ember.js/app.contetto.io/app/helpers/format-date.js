import Ember from 'ember';
import moment from 'moment';

export default Ember.Helper.helper(function(date,d)
{
  	return  moment.utc(date[0]).format(d.format);
});
