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
	// signIn: async (email: string, password: string) => {
	// 	await signInWithEmailAndPassword(auth, email, password);
	// },
	// signUp: async (email: string, password: string) => {
	// 	await createUserWithEmailAndPassword(auth, email, password);
	// 	await addUserToDB(auth.currentUser?.uid, email);
	// },
	// signOut: () => {
	// 	signOut(auth);
	// },
	// resetPassword: async (email: string) => {
	// 	if (!email) {
	// 		console.log('No email!');
	// 		return;
	// 	}
	// 	await sendPasswordResetEmail(auth, email);
	// },
	// updateEmail: async (newEmail: string) => {
	// 	if (auth.currentUser) {
	// 		authStore.update((storeState: AuthStoreState): AuthStoreState => {
	// 			return {
	// 				...storeState,
	// 				currentUser: {
	// 					...storeState.currentUser,
	// 					email: newEmail,
	// 				},
	// 			};
	// 		});
	// 		await updateEmail(auth.currentUser, newEmail);
	// 	}
	// },
};
