import { database } from '$lib/client/firebaseConfig';
import { doc, getDoc, setDoc, query, collection, getDocs } from 'firebase/firestore';
import type { GroceryList } from '../../types';

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

export const getRecipes = async (uid: string) => {
	const recipeQuery = query(collection(database, `users/${uid}/recipes`));

	const recipeTitles: string[] = [];

	const recipesSnapshot = await getDocs(recipeQuery);

	recipesSnapshot.forEach(doc => {
		recipeTitles.push(doc.data().name);
	});

	return recipeTitles;
};

export const getGroceryLists = async (uid: string) => {
	const groceryListQuery = query(collection(database, `users/${uid}/groceryLists`));

	const groceryLists: GroceryList[] = [];

	const groceryListsSnapshot = await getDocs(groceryListQuery);

	groceryListsSnapshot.forEach(doc => {
		groceryLists.push(doc.data());
	});

	return groceryLists;
};
