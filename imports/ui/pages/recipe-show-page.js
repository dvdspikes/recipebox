import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Recipes } from '/imports/api/recipes/recipes.js'

import '../components/recipe-show.js';
import './recipe-show-page.html';

Template.Recipe_show_page.onCreated(function recipeShowPageOnCreated() {
	this.subscribe('recipes.one', FlowRouter.getParam('_id'));
	
	// this.getRecipeId = () => new Meteor.Collection.ObjectID(FlowRouter.getParam('_id'));
	this.getRecipeId = () => FlowRouter.getParam('_id');
	this.getRecipe = () => Recipes.findOne(getrecipeId());

	this.state = new ReactiveDict();
	this.state.setDefault({
		editing: false,
	});

	this.saveRecipe = () => {
		this.state.set('editing', false);
	}

	this.editRecipe = () => {
		this.state.set('editing', true);
	};
});

Template.Recipe_show_page.onRendered(function recipeShowPageOnRendered() {

});

Template.Recipe_show_page.events({});

Template.Recipe_show_page.helpers({
	recipeIdArray() {
		const instance = Template.instance();
		const recipeId = instance.getRecipeId();
		return Recipes.findOne(recipeId) ? [recipeId] : [];
	},
	recipeArgs(recipeId) {
		const instance = Template.instance();
		const recipe = Recipes.findOne(recipeId, { fields: { _id: true } });
		return {
			recipe() {
				return Recipes.findOne(recipeId);
			},
			editing: instance.state.get('editing'),
			onEditingChange(editing) {
				instance.state.set('editing', editing);
			},
			onDeleted() {
				FlowRouter.go('Recipes.list');
			}
		};
	},
});