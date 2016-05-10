import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '/imports/ui/layouts/app-body.js';
import '/imports/ui/pages/app-home.js';
import '/imports/ui/pages/recipes-list-page.js';
import '/imports/ui/pages/recipe-show-page.js';
import '../../ui/pages/recipe-create-page.js';
import '../../ui/pages/shopping-list.js';

FlowRouter.route('/', {
	name: 'App.home',
	action() {
		BlazeLayout.render('App_body', {main: 'app_home'});
	},
});

FlowRouter.route('/recipes', {
	name: 'Recipes.list',
	action() {
		// console.log(FlowRouter.getRouteName());
		BlazeLayout.render('App_body', {main: 'Recipes_list_page'});
	},
});

FlowRouter.route('/recipes/new', {
	name: 'Recipes.new',
	action() {
		// console.log(FlowRouter.getRouteName());
		BlazeLayout.render('App_body', {main: 'Recipe_create_page'});
	},
});

FlowRouter.route('/recipes/:_id', {
	name: 'Recipes.show',
	action() {
		// console.log(FlowRouter.getRouteName());
		BlazeLayout.render('App_body', {main: 'Recipe_show_page'});
	},
});

FlowRouter.route('/list', {
	name: 'shopping_list',
	action() {
		console.log("route: shopping_list");
		BlazeLayout.render('App_body', {main: 'shopping_list'});
	},
});