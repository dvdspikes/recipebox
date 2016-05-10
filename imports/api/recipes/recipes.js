import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Recipes = new Mongo.Collection('recipes', {idGeneration: 'MONGO'});

// IngredientSchema = new SimpleSchema({
// 	type: {
// 		type: String,
// 		label: "Ingredient",
// 	},
// 	amount: {
// 		type: String,
// 		label: "Amount",
// 	},
// });
RecipeSchema = new SimpleSchema({
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
	// ingredients2: {
	// 	type: [IngredientSchema],
	// 	label: "Ingredients",
	// 	optional: true,
	// },
	directions: {
		type: [String],
		label: "Directions",
		minCount: 1,
	},
	// owner: {
	// 	type: String,
	// 	label: "Owner",
	// 	autoValue:function(){ return this.userId },
	// },
	// username: {
	// 	type: String,
	// 	label: "Username",
	// },
});
Recipes.attachSchema(RecipeSchema);

export { Recipes };