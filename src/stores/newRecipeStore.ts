import { writable, type Writable } from 'svelte/store';
import type { IngredientType, RecipeType } from '../types';

const initialNewRecipeState: RecipeType = {
	name: '',
	ingredientList: [{ name: '', amount: undefined, unit: '' }],
	instructions: [],
	slug: '',
};

export const newRecipeStore: Writable<RecipeType> = writable(initialNewRecipeState);

export const newRecipeHandlers = {
	addIngredient: () => {
		newRecipeStore.update(storeState => {
			return {
				...storeState,
				ingredientList: [...storeState.ingredientList, { name: '', amount: null, unit: null }],
			};
		});
	},
	deleteIngredient: (newIngredientsArray: IngredientType[]) => {
		newRecipeStore.update(storeState => {
			return {
				...storeState,
				ingredientList: newIngredientsArray,
			};
		});
	},
	addInstruction: (newInstruction: string) => {
		newRecipeStore.update(storeState => {
			return {
				...storeState,
				instructions: [...storeState.instructions, newInstruction],
			};
		});
	},
	deleteInstruction: (newInstructionsArray: IngredientType[]) => {
		newRecipeStore.update(storeState => {
			return {
				...storeState,
				ingredientList: newInstructionsArray,
			};
		});
	},
};
