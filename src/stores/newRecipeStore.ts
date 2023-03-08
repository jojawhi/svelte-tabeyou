import { writable, type Writable } from 'svelte/store';
import type { IngredientType, RecipeType } from '../types';

const initialNewRecipeState: RecipeType = {
	name: '',
	ingredientList: [{ name: '', amount: undefined, unit: '' }],
	instructions: ['Add some instructions!'],
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
	addInstruction: () => {
		newRecipeStore.update(storeState => {
			return {
				...storeState,
				instructions: [...storeState.instructions, 'New instruction'],
			};
		});
	},
	deleteInstruction: (newInstructionsArray: string[]) => {
		newRecipeStore.update(storeState => {
			return {
				...storeState,
				instructions: newInstructionsArray,
			};
		});
	},
};
