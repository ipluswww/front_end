import controller from './bookmark-bar.controller.js'

let BookmarkBar = {
	bindings: {
		container: '<',
		items: '<'
	},
    controller: controller,
    controllerAs:'$ctrl',
	templateUrl: 'templates/components/bookmark-bar.component.html'
};



export default BookmarkBar;
