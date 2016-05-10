import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Recipes } from '../../api/recipes/recipes.js'

import './recipe-form.html';

Template.Recipe_form.onCreated(function recipeFormOnCreated() {
	const self = this;
	self.autorun(() => {
		new SimpleSchema({
			type: { type: String },
			meteormethod: { type: String },
			doc: { type: Function },
			onSubmit: { type: Function },
			onSuccess: { type: Function },
			cancel: { type: Function },
		}).validate(Template.currentData());
	});
	console.log('here: %j', this.data.doc());
	AutoForm.addHooks('recipeForm',
		{
			formToDoc: function(recipe) {
				console.group('formToDoc');
				console.log('recipe: %j', recipe);
				// console.log('owner: %j', recipe.owner);
				if (typeof recipe.ingredients === "string") {
					recipe.ingredients = recipe.ingredients.split("\n");
				}
				if (typeof recipe.directions === "string") {
					recipe.directions = recipe.directions.split("\n");	
				}
				// if (!Meteor.userId) {
				// 	throw new Meteor.Error('not-authorized');
				// }
				// recipe.owner = Meteor.userId();
				console.groupEnd();
				return recipe;
			},
			docToForm: function(recipe) {
				console.group('docToForm');
				console.log('recipe: %j', recipe);
				// console.log('owner: %j', recipe.owner);
				if (_.isArray(recipe.ingredients)) {
					recipe.ingredients = recipe.ingredients.join("\n");
				}
				if (_.isArray(recipe.directions)) {
					recipe.directions = recipe.directions.join("\n");
				}
				console.groupEnd();
				return recipe;
			},
			beginSubmit: function() {
				console.group('beginSubmit');
				console.log('recipe: %j', this.insertDoc);
				console.groupEnd();
			},
			onSuccess: function(result) {
				self.data.onSuccess(result);
			},
		},
		true);
});

Template.Recipe_form.events({
	'mousedown #cancel'(e, t) {
		// console.group("Recipe_form mousedown .js-edit-item-cancel");
		// console.log("event: %j", e);
		// console.log("template: %j", t);
		// console.groupEnd();
		AutoForm.resetForm('recipeForm');
		Template.instance().data.cancel();
	},
});

Template.Recipe_form.helpers({
	recipes() {
		return Recipes;
	},
});