import { database } from '$lib/client/firebaseConfig';
import { doc, getDoc, addDoc, setDoc, collection } from 'firebase/firestore';

//Working
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
		} catch (error: any) {
			console.log(error.message);
		}
	}
};
