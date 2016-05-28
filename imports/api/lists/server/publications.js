import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Lists } from '../lists.js';

Meteor.publish('lists.one', function listsOne() {
	if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
	return Lists.findOne();
});

Meteor.publish('recipes.one', function recipesOne(recipeId) {
	new SimpleSchema({
    recipeId: { type: String },
  }).validate({ recipeId });
  return Recipes.find(new Meteor.Collection.ObjectID(recipeId));
});