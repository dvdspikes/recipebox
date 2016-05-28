import { Recipes } from '../../api/recipes/recipes.js';

Meteor.startup(() => {
  if (Recipes.find().count() === 0) {
  	const data = [
  		{
  			name: "Guacamole",
  			description: "Yummy Whole30 guacamole!",
  			servings: "4",
  			prep_time: "0:15",
  			source: "http://livingmy20sdaybyday.blogspot.com/2014/02/whole30-fajitas-guacamole.html",
  			ingredients: [
  				"2 ripe avocados, mashed",
					"1 clove garlic, minced",
					"juice of 1/2 lime",
					"1/2 tomato, diced",
					"1/4 small yellow (or red) onion, diced",
					"1/4 teaspoon cumin",
					"1/4 teaspoon kosher salt",
  			],
  			directions: [
  				"Mix all of the ingredients in a bowl, cover, and set in the refrigerator."
  			],
  		},
  		{
  			name: "Beef fajitas",
  			description: "Yummy Whole30 beef fajitas!",
  			servings: "2",
  			prep_time: "0:30",
  			cook_time: "0:30",
  			source: "http://livingmy20sdaybyday.blogspot.com/2014/02/whole30-fajitas-guacamole.html",
  			ingredients: [
  				"1/4 cup lime juice",
					"zest of 1 lime",
					"2 cloves garlic, minced",
					"1/4 small yellow onion, diced",
					"1 teaspoon ground cumin",
					"1 teaspoon southwest taco spice (you can substitute this with another teaspoon of cumin if needed)",
					"2 tablespoons olive oil",
  			],
  			directions: [
  				"Combine all ingredients in a bowl.",
  				"Add 1lb skirt steak strips and let marinate for at least an hour in the refrigerator.",
  			],
  		},
      {
        name: "Prosciutto Fig Pizza",
        description: "Prosciutto Fig Pizza",
        servings: 4,
        prep_time: "0:15",
        cook_time: "0:10",
        ingredients: [
          "Prosciutto",
          "Figs",
          "Mozzarella cheese",
          "Tomato sauce",
          "Thin rolled pizza crust",
        ],
        directions: [
          "Preheat oven to 425 F",
          "Spread tomato sauce on the pizza crust",
          "Place a thin layer of mozzarella cheese over the tomato sauce",
          "Remove excess fat from the prosciutto and place in even amount onto the pizza",
          "Slice figs into thin pieces and place sparingly onto the pizza",
          "Add more mozzarella cheese over the toppings, about double as in the second step",
          "Bake at 425 F for 10 minutes",
        ],
      }
  	];
  	data.forEach((recipe) => {
  		const recipeId = Recipes.insert(recipe);
  	});
  }
});