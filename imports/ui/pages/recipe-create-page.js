import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Recipes } from '../../api/recipes/recipes.js';
import { insert } from '../../api/recipes/methods.js';

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

Template.Recipe_create_page.helpers({
	Recipes() {
		return Recipes;
	},
	formArgs() {
		const instance = Template.instance();
		return {
			type: 'normal',
			doc: () => {},
			onSubmit: function(insertDoc, updateDoc, currentDoc) {
				let res = insert.call({recipe: insertDoc});
				// console.log('res: %j', res);
				return res;
			},
			onSuccess: function(formType, result)  {
				// instance.onEditingChange(false);
				// console.log('formType: %j', formType);
				// console.log('result: %j', result);
				FlowRouter.go('Recipes.show', {_id:result});
			},
			cancel: function() {
				FlowRouter.go('Recipes.list');
				// instance.onEditingChange(false);
			},
		};
	},
});