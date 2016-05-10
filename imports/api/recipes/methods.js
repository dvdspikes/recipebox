import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Recipes } from './recipes.js';

export const insert = new ValidatedMethod({
	name: 'recipes.insert',
	validate: Recipes.simpleSchema().validator(),
	run({doc}) {
		// console.group('recipes.insert');
		console.log("In recipes.insert");
		console.log('recipe: %j', doc);
		console.log('this: %j', this);
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}
		doc.owner = Meteor.userId();
		// console.groupEnd();
		return Recipes.insert(doc);
	},
});

export const update = new ValidatedMethod({
	name: 'recipes.update',
	validate: Recipes.simpleSchema().validator(),
	run({modifier, recipeId}) {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		const oldRecipe = Recipes.findOne(recipeId);
		if (this.userId() !== oldRecipe.owner) {
			throw new Meteor.Error('not-authorized');
		}
		return Recipes.update(recipeId, modifer);
	}
});

export const remove = new ValidatedMethod({
	name: 'recipes.remove',
	validate: Recipes.simpleSchema().validator(),
	run({_id}) {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		const oldRecipe = Recipes.findOne(_id);
		if (this.userId() !== oldRecipe.owner) {
			throw new Meteor.Error('not-authorized');
		}
		return Recipes.remove(_id);
	}
});