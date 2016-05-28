import { Template } from 'meteor/templating';
//import { FlowRouter } from 'meteor/kadira:flow-router';

import { Recipes } from '/imports/api/recipes/recipes.js'

import './recipes-list-page.html'

Template.Recipes_list_page.onCreated(function recipesListPageOnCreated() {
	this.subscribe('recipes.all');
});

Template.Recipes_list_page.helpers({
	recipes() {
		//const instance = Template.instance();
		//return instance.allRecipes;
		return Recipes.find({});
	},
	hasRecipes() {
		const instance = Template.instance();
		return instance.recipes().count() > 0;
	},
});