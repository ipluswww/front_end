import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const BrandAddNewGoalRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
	toast: Ember.inject.service(),

  model() {
    // this.store.findAll('goal');
    return Ember.RSVP.hash({
      currentStep: 'startGoal',
			goalType: null
    });
  },
  actions: {
    goToStep(step) {
			const { currentStep } = this.get('currentModel');
			if (currentStep === 'startGoal' && !step) {
				this.get('toast').error('You need to select one type of goal', 'Error');
				return;
			}
      this.set('currentModel.currentStep', step || 'finishGoal');
    },
  }
});

export default BrandAddNewGoalRoute;
