import { Suspense, useEffect } from 'react';
import {
	Await,
	Outlet,
	defer,
	useAsyncValue,
	useLoaderData,
	useNavigate,
} from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Loader } from '../components/Loaders/Loader';
import { Tabs } from '../components/Standings/Tabs';

export const StandingsLayout = () => {
	const { leagues } = useLoaderData();

	return (
		<ProtectedRoute>
			<Suspense fallback={<Loader />}>
				<Await resolve={leagues}>
					<StandingsContent />
				</Await>
			</Suspense>
			<Outlet />
		</ProtectedRoute>
	);
};

const StandingsContent = () => {
	const leauges = useAsyncValue();
	const firstLeague = leauges[0].currentSeasonId;
	const navigate = useNavigate();

	useEffect(() => {
		navigate(`${firstLeague}`);
	}, [navigate, firstLeague]);

	return <Tabs leagues={leauges} />;
};

export const loader = () => {
	const leaguesPromise = loadLeagues();

	return defer({
		leagues: leaguesPromise,
	});
};

const loadLeagues = async () => {
	const response = await fetch('/.netlify/functions/leagues');

	if (!response.ok) {
		return response;
	}

	const data = await response.json();

	return data;
};
