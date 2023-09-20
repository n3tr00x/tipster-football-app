import { auth } from './firebase';
import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth';

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
		});

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
