import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// export const Recipes = new Mongo.Collection('recipes', {idGeneration: 'MONGO'});
export const Recipes = new Mongo.Collection('recipes');

Recipes.schema = new SimpleSchema({
	// _id: {
	// 	type: String,
	// 	optional: true,
	// },
	name: {
		type: String,
		label: "Name",
		max: 200,
	},
	description: {
		type: String,
		label: "Description",
	},
	servings: {
		type: Number,
		label: "Number of servings",
	},
	prep_time: {
		type: String,
		label: "Preparation time",
		optional: true,
		regEx: /[0-9]{1,2}\:[0-9]{2}/,
	},
	cook_time: {
		type: String,
		label: "Cook time",
		optional: true,
		regEx: /[0-9]{1,2}\:[0-9]{2}/,
	},
	source: {
		type: String,
		regEx: SimpleSchema.RegEx.Url,
		optional: true,
	},
	ingredients: {
		type: [String],
		label: "Ingredients",
		minCount: 1,
	},
	directions: {
		type: [String],
		label: "Directions",
		minCount: 1,
	},
	createdBy: {
		type: String,
		optional: true,
		// autoValue: function() {
  //     if (this.isInsert) {
  //       return this.userId;
  //     } else if (this.isUpsert) {
  //       return {$setOnInsert: this.userId};
  //     } else {
  //       this.unset();  // Prevent user from supplying their own value
  //     }
  //   }
	},
	createdAt: {
		type: Date,
		optional: true,
		// autoValue: function() {
  //     if (this.isInsert) {
  //       return new Date();
  //     } else if (this.isUpsert) {
  //       return {$setOnInsert: new Date()};
  //     } else {
  //       this.unset();  // Prevent user from supplying their own value
  //     }
  //   }
	},
});
Recipes.attachSchema(Recipes.schema);

// Recipes.helpers({
// 	isEditableBy(userId) {
// 		if (!this.createdBy) {
//       return true;
//     }

//     return this.createdBy === userId;
// 	}
// });

// export { Recipes, RecipeSchema };