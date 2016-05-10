import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Recipes } from '../../api/recipes/recipes.js'

import './recipe-form.js';
import './recipe-show.html';

Template.Recipe_show.onCreated(function recipeShowOnCreated() {
	this.autorun(() => {
		new SimpleSchema({
			recipe: { type: Function },
			editing: { type: Boolean },
			onEditingChange: { type: Function },
			onDeleted: { type: Function },
		}).validate(Template.currentData());
	});
});

Template.Recipe_show.events({
	'click #edit'(e, t) {
		t.data.onEditingChange(true);
	},
	'click #delete'(e, t) {
		if (confirm("Are you sure?")) {
			Recipes.remove(t.data.recipe()._id);
			t.data.onDeleted();
		}
	},
});

Template.Recipe_show.helpers({
	Recipes() {
		return Recipes;
	},
	formArgs() {
		const instance = Template.instance();
		return {
			type: 'update',
			doc: instance.data.recipe,
			onSuccess: (result) => {
				instance.data.onEditingChange(false);
			},
			cancel: () => {
				instance.data.onEditingChange(false);
			},
		};
	},
});
