import { createContext, useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext({
	isLoading: true,
	user: null,
});

export const AuthProvider = ({ children }) => {
	const [authentication, setAuthentication] = useState({
		isLoading: true,
		user: null,
	});

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			if (user) {
				setAuthentication({
					isLoading: false,
					user,
				});
			} else {
				setAuthentication({
					isLoading: false,
				});
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return <AuthContext.Provider value={authentication}>{children}</AuthContext.Provider>;
};
