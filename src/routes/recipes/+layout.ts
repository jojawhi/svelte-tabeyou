import type { LayoutLoad } from './$types';
import { getRecipes } from '$lib/firebase/firebaseUtils';
import { auth } from '$lib/client/firebaseConfig';
import { error } from '@sveltejs/kit';

export const load: LayoutLoad = async () => {
	const { currentUser } = auth;
	if (currentUser) {
		const { uid } = currentUser;
		const recipes = await getRecipes(uid);

		return {
			recipes,
			currentUser,
		};
	} else {
		throw error(404, 'User not found');
	}

	// could also be written as return { recipes };
};
