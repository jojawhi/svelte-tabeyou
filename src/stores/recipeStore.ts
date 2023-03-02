import { addRecipeToDb, deleteRecipeFromDb, updateRecipeInDb } from '$lib/firebase/firebaseUtils';
import type { RecipeType, IngredientType } from '../types';
import { writable, type Writable } from 'svelte/store';

type RecipeStoreState = {
	isLoading: boolean;
	recipes: RecipeType[];
};

const initialRecipeState: RecipeStoreState = {
	isLoading: true,
	recipes: [],
};

export const recipeStore: Writable<RecipeStoreState> = writable(initialRecipeState);

export const recipeHandlers = {
	addRecipe: async (uid: string, recipe: Recipe) => {
		addRecipeToDb(uid, recipe);
	},
	deleteRecipe: (uid: string, recipeId: string) => {
		deleteRecipeFromDb(uid, recipeId);
	},
	updateRecipe: (
		uid: string,
		recipeId: string,
		updateData: Record<string, string | string[] | IngredientType[]>
	) => {
		updateRecipeInDb(uid, recipeId, updateData);
	},
};
