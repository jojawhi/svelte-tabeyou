import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	updateEmail,
	updatePassword,
} from 'firebase/auth';
import { writable, type Writable } from 'svelte/store';
import { auth } from '$lib/client/firebaseConfig';
import type { User } from 'firebase/auth';
import { addUserToDB } from '$lib/firebase/firebaseUtils';
// import type { Updater } from 'svelte/store';

type AuthStoreState = {
	isLoading: boolean;
	currentUser: User | null;
};

const initialAuthState: AuthStoreState = {
	isLoading: true,
	currentUser: null,
};

export const authStore: Writable<AuthStoreState> = writable(initialAuthState);

export const authHandlers = {
	signIn: async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password);
	},
	signUp: async (email: string, password: string) => {
		await createUserWithEmailAndPassword(auth, email, password);
		await addUserToDB(auth.currentUser?.uid, email);
	},
	signOut: () => {
		signOut(auth);
	},
	resetPassword: async (email: string) => {
		if (!email) {
			console.log('No email!');
			return;
		}
		await sendPasswordResetEmail(auth, email);
	},
	updateEmail: async (newEmail: string) => {
		if (auth.currentUser) {
			authStore.update((storeState: AuthStoreState) => {
				return {
					...storeState,
					currentUser: {
						...storeState.currentUser,
						email: newEmail,
					},
				};
			});
			await updateEmail(auth.currentUser, newEmail);
		}
	},
	updatePassword: async (password: string) => {
		if (auth.currentUser) {
			await updatePassword(auth.currentUser, password);
		}
	},
};
