import { auth } from './firebase';
import {
	EmailAuthProvider,
	createUserWithEmailAndPassword,
	reauthenticateWithCredential,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	updateEmail,
	updatePassword,
	updateProfile,
} from 'firebase/auth';
import { setUsername } from './database';

class AuthError extends Error {
	name = 'AuthError';
	isFormDataValid = false;

	constructor(message) {
		super(message);
		this.message = message;
	}
}

export const getUserUID = async () => {
	try {
		return auth.authStateReady().then(() => auth.currentUser?.uid);
	} catch (error) {
		return {
			isError: true,
			message: 'Wystąpił błąd z pobraniem identyfikatora klienta!',
		};
	}
};

export const registerUser = async ({
	email,
	username,
	password,
	confirmPassword,
}) => {
	try {
		if (password !== confirmPassword) {
			throw { code: 'auth/passwords-not-identical' };
		}

		const { user } = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);

		await updateProfile(user, {
			displayName: username,
			photoURL:
				'https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_1280.png',
		});

		setUsername(username);

		await sendEmailVerification(user, {
			url: `${window.location.origin}/sign-in`,
			handleCodeInApp: true,
		});

		await signOut(auth);
	} catch (error) {
		switch (error.code) {
			case 'auth/invalid-email':
				throw new AuthError('Nieprawidłowy e-mail!');
			case 'auth/passwords-not-identical':
				throw new AuthError('Hasła nie są identyczne!');
			case 'auth/email-already-in-use':
				throw new AuthError('Ten email jest już w użytku!');
			case 'auth/weak-password':
				throw new AuthError(
					'Hasło jest zbyt słabe. Musi składać się z minimum 6 znaków.'
				);
			default:
				throw new AuthError('Nieznany błąd.');
		}
	}
};

export const signIn = async ({ email, password }) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);

		if (!auth.currentUser.emailVerified) {
			await signOut(auth);
			throw { code: 'auth/email-not-verified' };
		}

		return {
			isLoggedIn: true,
		};
	} catch (error) {
		switch (error.code) {
			case 'auth/invalid-email':
				throw new AuthError('Nieprawidłowy e-mail!');
			case 'auth/user-not-found':
			case 'auth/wrong-password':
				throw new AuthError('Nieprawidłowe dane logowania!');
			case 'auth/user-disabled':
				throw new AuthError('Konto jest wyłączone!');
			case 'auth/too-many-requests':
				throw new AuthError('Wysłano zbyt wiele żądań.');
			case 'auth/email-not-verified':
				throw new AuthError('Konto nie jest zweryfikowane.');
			default:
				throw new AuthError('Nieznany błąd.');
		}
	}
};

export const forgotPassword = async ({ email }) => {
	try {
		const actionCodeSettings = {
			url: `${window.location.origin}/sign-in`,
			handleCodeInApp: true,
		};

		await sendPasswordResetEmail(auth, email, actionCodeSettings);
	} catch (error) {
		switch (error.code) {
			case 'auth/invalid-email':
				throw new AuthError('Nieprawidłowy e-mail!');
			case 'auth/user-not-found':
				throw new AuthError(
					'Nie znaleziono użytkownika powiązanego z podanym emailem.'
				);
			default:
				throw new AuthError('Nieznany błąd.');
		}
	}
};

export const updateProfileDetails = updatedData => {
	return updateProfile(auth.currentUser, {
		...updatedData,
	});
};

export const updateUserEmail = async ({ email, password }) => {
	try {
		const credential = EmailAuthProvider.credential(
			auth.currentUser.email,
			password
		);

		await reauthenticateWithCredential(auth.currentUser, credential);

		await updateEmail(auth.currentUser, email);
		await sendEmailVerification(auth.currentUser, {
			url: `${window.location.origin}/sign-in`,
			handleCodeInApp: true,
		});

		signOut(auth);
	} catch (error) {
		console.log(error);
		switch (error.code) {
			case 'auth/invalid-credential':
				throw new AuthError('Nastąpiła zła weryfikacja konta!');
			case 'auth/wrong-password':
				throw new AuthError('Podano złe aktualne hasło!');
			case 'auth/passwords-not-identical':
				throw new AuthError('Hasła nie są identyczne!');
			case 'auth/weak-password':
				throw new AuthError(
					'Hasło jest zbyt słabe. Musi składać się z minimum 6 znaków.'
				);
			default:
				throw new AuthError('Nieznany błąd.');
		}
	}
};

export const updateUserPassword = async ({
	email,
	currentPassword,
	password,
	confirmPassword,
}) => {
	try {
		if (password !== confirmPassword) {
			throw {
				code: 'auth/passwords-not-identical',
			};
		}

		const credential = EmailAuthProvider.credential(email, currentPassword);
		await reauthenticateWithCredential(auth.currentUser, credential);

		updatePassword(auth.currentUser, password);
	} catch (error) {
		switch (error.code) {
			case 'auth/invalid-credential':
				throw new AuthError('Nastąpiła zła weryfikacja konta!');
			case 'auth/wrong-password':
				throw new AuthError('Podano złe aktulne konto');
			case 'auth/passwords-not-identical':
				throw new AuthError('Hasła nie są identyczne!');
			case 'auth/weak-password':
				throw new AuthError(
					'Hasło jest zbyt słabe. Musi składać się z minimum 6 znaków.'
				);
			default:
				throw new AuthError('Nieznany błąd.');
		}
	}
};

export const logout = async () => {
	await signOut(auth);
};
