import type { Timestamp } from 'firebase/firestore';

export type IngredientType = {
	name: string;
	amount?: number | undefined;
	unit?: string | undefined;
};

export type RecipeType = {
	author?: string;
	name: string;
	ingredientList: IngredientType[];
	instructions?: string[];
	slug?: string;
};

export type GroceryListType = {
	author: string;
	dateEnd?: Timestamp;
	dateStart?: Timestamp;
	expired?: boolean;
	listItems: IngredientType[];
};
