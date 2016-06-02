import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Recipes } from './recipes.js';

Meteor.startup(() => {});


export const insert = new ValidatedMethod({
	name: 'recipes.insert',
	validate: new SimpleSchema({
		recipe: {type: Recipes.schema},
	}).validator(),
	run({recipe}) {
		console.log('Meteor.userId: %j', Meteor.userId());
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}
		if (Meteor.isServer) {
			Recipes.schema.clean(recipe);
		}
		recipe.createdBy = Meteor.userId();
		recipe.createdAt = new Date();
		return Recipes.insert(recipe);
	},
});

export const update = new ValidatedMethod({
	name: 'recipes.update',
	validate({recipeId, recipe}) {
		new SimpleSchema({
			recipeId: {type: String},
		}).validate({recipeId});
		Recipes.schema.validate(recipe, {modifier:true});
	},
	run({recipeId, recipe}) {
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}
		let old = Recipes.findOne({_id: recipeId});
		if (!old) {
			throw new Meteor.Error('illegal-argument');
		}
		if (Meteor.userId() != old.createdBy)
			throw new Meteor.Error('not-authorized');
		Recipes.update(recipeId, recipe);
	},
});

export const remove = new ValidatedMethod({
	name: 'recipes.remove',
	validate: new SimpleSchema({
		recipeId: { type: String },
	}).validator(),
	run({ recipeId }) {
		const recipe = Recipes.findOne(recipeId);

		if (!recipe)
			throw new Meteor.error('does-not-exist');

		if (!Meteor.userId() || Meteor.userId() != recipe.createdBy) {
			throw new Meteor.Error('not-authorized');
		}

		Recipes.remove(recipeId);
	},
});