import type { Handle } from '@sveltejs/kit';
import { auth } from '$lib/client/firebaseConfig';

export const handleUser: Handle = async ({ event, resolve }) => {
	//Stage 1
	event.locals.user = auth.currentUser;

	//Stage 2
	const response = await resolve(event);

	//Stage 3
	return response;
};
