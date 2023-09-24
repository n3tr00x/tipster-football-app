import { useLoaderData } from 'react-router-dom';
import { getLeaderboards } from '../../firebase/database';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Leaderboard } from '../components/Leaderboard/Leaderboard';

export const loader = () => {
	const users = getLeaderboards();
	return users;
};

export const LeaderboardPage = () => {
	const users = useLoaderData();

	return (
		<ProtectedRoute>
			<Leaderboard users={users} />
		</ProtectedRoute>
	);
};
