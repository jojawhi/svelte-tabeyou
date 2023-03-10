import type { LayoutLoad } from './$types';
import { getRecipes } from '$lib/firebase/firebaseUtils';
import { auth } from '$lib/client/firebaseConfig';
import { error } from '@sveltejs/kit';
import { authStore } from '../../stores/authStore';
import { recipeStore } from '../../stores/recipeStore';

export const load: LayoutLoad = async () => {
	const { currentUser } = auth;
	if (currentUser) {
		const { uid } = currentUser;
		const recipes = await getRecipes(uid);

		recipeStore.update(storeState => {
			return { ...storeState, isLoading: false, recipes: recipes };
		});

		return {
			recipes,
			currentUser,
		};
	} else {
		throw error(404, 'User not found');
	}
};
