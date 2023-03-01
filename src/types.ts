import type { Timestamp } from 'firebase/firestore';

export type Ingredient = {
	name: string;
	amount?: number | undefined;
	unit?: string | undefined;
};

export type Recipe = {
	author: string;
	name: string;
	ingredientList: Ingredient[];
	instructions?: string[];
};

export type GroceryList = {
	author: string;
	dateEnd?: Timestamp;
	dateStart?: Timestamp;
	expired?: boolean;
	listItems: Ingredient[];
};
