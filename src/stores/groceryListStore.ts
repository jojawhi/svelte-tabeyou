import { writable, type Writable } from 'svelte/store';
import type { Ingredient } from '../types';

type GroceryListStoreState = {
	isLoading: boolean;
	items: Ingredient[];
};

const initialGroceryListState: GroceryListStoreState = {
	isLoading: true,
	items: [
		{
			name: 'Add items or generate a list from your meal plan',
			amount: 1,
			unit: 'pc',
		},
		{
			name: '',
			amount: undefined,
			unit: undefined,
		},
		{
			name: '',
			amount: undefined,
			unit: undefined,
		},
	],
};

export const groceryListStore: Writable<GroceryListStoreState> = writable(initialGroceryListState);

export const groceryHandlers = {
	addItem: () => {
		groceryListStore.update(storeState => {
			return {
				...storeState,
				items: [...storeState.items, { name: '', amount: null, unit: null }],
			};
		});
	},
	deleteItem: (newItemsArray: Ingredient[]) => {
		groceryListStore.update(storeState => {
			return {
				...storeState,
				items: newItemsArray,
			};
		});
	},
};
