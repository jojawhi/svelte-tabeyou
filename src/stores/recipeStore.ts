import { writable, type Writable } from 'svelte/store';

type Ingredient = {
	name: string | null;
	amount: number | null;
	unit: string | null;
};

type Recipe = {
	author: string;
	name: string;
	ingredientList: Ingredient[];
	instructions?: string[];
};

type RecipeStoreState = {
	isLoading: boolean;
	recipes: Recipe[];
};

const initialRecipeState: RecipeStoreState = {
	isLoading: true,
	recipes: [],
};

export const recipeStore: Writable<RecipeStoreState> = writable(initialRecipeState);

export const recipeHandlers = {};
