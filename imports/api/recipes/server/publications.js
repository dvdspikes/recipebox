import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Recipes } from '../recipes.js';

Meteor.publish('recipes.all', function recipesAll() {
	// return Recipes.find({}, {fields:{name:1}});
	return Recipes.find();
});

Meteor.publish('recipes.one', function recipesOne(recipeId) {
	new SimpleSchema({
    recipeId: { type: String },
  }).validate({ recipeId });
  // return Recipes.find(new Meteor.Collection.ObjectID(recipeId));
  return Recipes.find(recipeId);
});