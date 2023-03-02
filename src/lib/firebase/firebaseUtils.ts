import { database } from '$lib/client/firebaseConfig';
import {
	doc,
	addDoc,
	getDoc,
	setDoc,
	query,
	collection,
	getDocs,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore';
import type { GroceryList, Ingredient, Recipe } from '../../types';

// Users
export const addUserToDB = async (uid: string | undefined, email: string) => {
	if (!uid || !email) {
		console.log('Could not add user to db.');
		return;
	}

	const usersRef = collection(database, 'users');

	if (uid) {
		try {
			await setDoc(doc(usersRef, uid), {
				email: email,
				settings: {
					darkMode: true,
					shoppingDay: 'sun',
				},
			});
		} catch (error) {
			console.log(error);
		}
	}
};

// Recipes
export const getRecipes = async (uid: string) => {
	const recipeQuery = query(collection(database, `users/${uid}/recipes`));

	const recipes: Recipe[] = [];

	const recipesSnapshot = await getDocs(recipeQuery);

	recipesSnapshot.forEach(doc => {
		recipes.push(doc.data());
	});

	return recipes;
};

export const addRecipeToDb = async (uid: string, recipe: Recipe) => {
	const recipeRef = await addDoc(collection(database, `users/${uid}/recipes`), recipe);

	console.log('New recipe ID:', recipeRef.id);
};

export const deleteRecipeFromDb = async (uid: string, recipeId: string) => {
	await deleteDoc(doc(database, `users/${uid}/recipes`, recipeId));
};

export const updateRecipeInDb = async (
	uid: string,
	recipeId: string,
	updateData: Record<string, string | string[] | Ingredient[]>
) => {
	const recipeRef = doc(database, `users/${uid}/recipes`, recipeId);

	await updateDoc(recipeRef, updateData);
};

// Grocery Lists
export const getGroceryLists = async (uid: string) => {
	const groceryListQuery = query(collection(database, `users/${uid}/groceryLists`));

	const groceryLists: GroceryList[] = [];

	const groceryListsSnapshot = await getDocs(groceryListQuery);

	groceryListsSnapshot.forEach(doc => {
		groceryLists.push(doc.data());
	});

	return groceryLists;
};

export const updateGroceryList = async (
	uid: string,
	listId: string,
	newItemsArray: Ingredient[]
) => {
	const groceryListRef = doc(database, `users/${uid}/groceryLists/${listId}`);

	await updateDoc(groceryListRef, {
		items: newItemsArray,
	});
};
