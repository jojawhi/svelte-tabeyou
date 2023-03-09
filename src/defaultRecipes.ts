// Default recipe object that will be automatically added to new user's accounts

// Will include street corn salad, pad thai, shepherd's pie, mabou doufu, and one more

// Need to write a batch write function for firebase inside a useEffect that will add these to a new user's database on account creation

import type { RecipeType } from './types';

export const starterRecipes: RecipeType[] = [
	{
		name: 'Mexican Street Corn Salad',
		ingredientList: [
			{
				name: 'Frozen corn',
				amount: 1,
				unit: 'bag',
			},
		],
		instructions: ['Cook corn'],
		slug: 'mexican-street-corn-salad',
	},
];
