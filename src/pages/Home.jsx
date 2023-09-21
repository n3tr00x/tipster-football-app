import { useContext } from 'react';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { AuthContext } from '../contexts/Auth';
import { LandingPage } from './Landing';
import { UserSummary } from '../components/UserSummary/UserSummary';
import { Loader } from '../components/Loaders/Loader';
import { getScoredPoints } from '../../firebase/database';
import { useLoaderData } from 'react-router-dom';

export const HomePage = () => {
	const { user, isLoading } = useContext(AuthContext);
	const points = useLoaderData();

	if (isLoading) {
		return <Loader />;
	}

	return user ? (
		<ProtectedRoute>
			<UserSummary
				username={user.displayName}
				avatar={user.photoURL}
				points={points}
			/>
		</ProtectedRoute>
	) : (
		<LandingPage />
	);
};

export const loader = () => {
	const points = getScoredPoints();
	return points;
};
