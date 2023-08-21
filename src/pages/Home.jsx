import { useContext } from 'react';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { AuthContext } from '../contexts/Auth';
import { LandingPage } from './Landing';

export const HomePage = () => {
	const { user, isLoading } = useContext(AuthContext);

	if (isLoading) {
		return <p>ŁADOWANIE</p>;
	}

	return user ? (
		<ProtectedRoute>
			<h1>Witaj {user?.displayName}</h1>
		</ProtectedRoute>
	) : (
		<LandingPage />
	);
};
