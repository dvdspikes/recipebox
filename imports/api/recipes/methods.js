import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Recipes } from './recipes.js';

export const insert = new ValidatedMethod({
	name: 'recipes.insert',
	validate: new SimpleSchema({
		recipe: {type: Recipes.schema},
	}).validator(),
	run({recipe}) {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		recipe.createdBy = this.userId;
		recipe.createdat = new Date();
		return Recipes.insert(recipe);
	},
});

export const update = new ValidatedMethod({
	name: 'recipes.update',
	validate: new SimpleSchema({
		recipe: {type: Recipes.schema},
	}).validator(),
	run({recipe}) {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		let old = Recipes.findOne({_id: recipe._id, createdBy: this.userId});
		if (!old) {
			throw new Meteor.Error('not-authorized');
		}
		Recipes.update(recipe);
	},
});

export const remove = new ValidatedMethod({
	name: 'recipes.remove',
	validate: new SimpleSchema({
		recipeId: { type: String },
	}).validator(),
	run({ recipeId }) {
		const recipe = Recipes.findOne(recipeId);

		if (!this.userId || this.userId != recipe.createdBy) {
			throw new Meteor.Error('not-authorized');
		}
	},
});