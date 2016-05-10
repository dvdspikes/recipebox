import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Recipes } from '../../api/recipes/recipes.js'

import '../components/recipe-form.js';
import './recipe-create-page.html';

Template.Recipe_create_page.onCreated(function recipeCreatePageOnCreated() {
	// const self = this;
	// self.state = new ReactiveDict();
	// self.state.setDefault({
	// 	editing: false,
	// });
	// self.onEditingChange = (editing) => {
	// 	self.state.set('editing', editing);
	// }
});

// Template.Recipe_create_page.events({
// 	'mousedown .js-edit-item'() {
// 		this.onEditingChange(true);
// 	},
// });

Template.Recipe_create_page.events({
	// 'click '
});

Template.Recipe_create_page.helpers({
	Recipes() {
		return Recipes;
	},
	formArgs() {
		const instance = Template.instance();
		return {
			type: 'method',
			meteormethod: 'recipes.insert',
			doc: () => {
				// return {owner:Meteor.userId(),};
				return {};
			},
			onSubmit: (insertDoc, updateDoc, currentDoc) => {

			},
			onSuccess: (result) => {
				FlowRouter.go('Recipes.show', {_id: result._str});
				// instance.onEditingChange(false);
			},
			cancel: () => {
				FlowRouter.go('Recipes.list');
				// instance.onEditingChange(false);
			},
		};
	},
});