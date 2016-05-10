import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Recipes } from '../recipes.js';

Meteor.publish('recipes.all', function recipesAll() {
	// return Recipes.find({}, {fields:{name:1}});
	// sleep(5000);
	return Recipes.find();
});

Meteor.publish('recipes.one', function recipesOne(recipeId) {
	new SimpleSchema({
    recipeId: { type: String },
  }).validate({ recipeId });
  return Recipes.find(new Meteor.Collection.ObjectID(recipeId));
});

// function sleep(delay) {
//   var start = new Date().getTime();
//   while (new Date().getTime() < start + delay);
// }