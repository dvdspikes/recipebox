import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Recipes } from '../../api/recipes/recipes.js'

import './recipe-form.html';
if (Meteor.isClient)
    AutoForm.debug();

Template.Recipe_form.onCreated(function recipeFormOnCreated() {
	const self = this;
	self.autorun(() => {
		new SimpleSchema({
			type: { type: String },
			doc: { type: Function },
			onSubmit: { type: Function },
			onSuccess: { type: Function },
			cancel: { type: Function },
		}).validate(Template.currentData());
	});
});

Template.Recipe_form.onRendered(function recipeFormOnRendered() {
	const self = this;
	AutoForm.addHooks('recipeForm',
		{
			formToDoc: function(recipe) {
				if (typeof recipe.ingredients === "string") {
					recipe.ingredients = recipe.ingredients.split("\n");
				}
				if (typeof recipe.directions === "string") {
					recipe.directions = recipe.directions.split("\n");	
				}
				return recipe;
			},
			docToForm: function(recipe) {
				if (_.isArray(recipe.ingredients)) {
					recipe.ingredients = recipe.ingredients.join("\n");
				}
				if (_.isArray(recipe.directions)) {
					recipe.directions = recipe.directions.join("\n");
				}
				return recipe;
			},
			onSubmit: function(insertDoc, updateDoc, currentDoc) {
				let res = self.data.onSubmit(insertDoc, updateDoc, currentDoc);
				this.done(null, res);
				return false;
			},
			onSuccess: function(formType, result) {
				self.data.onSuccess(formType, result);
			},
			onError: function(formType, error) {},
		},
		true);
});

Template.Recipe_form.events({
	'click .js-edit-item-cancel'(e, t) {
		// console.group("Recipe_form mousedown .js-edit-item-cancel");
		// console.log("event: %j", e);
		// console.log("template: %j", t);
		// console.groupEnd();
		AutoForm.resetForm('recipeForm');
		Template.instance().data.cancel();
	},
	// 'submit #recipeForm'(e, t) {
	// 	// console.log('submit #recipeForm');
	// 	// e.preventDefault();
	// },
});

Template.Recipe_form.helpers({
	recipes() {
		return Recipes;
	},
});