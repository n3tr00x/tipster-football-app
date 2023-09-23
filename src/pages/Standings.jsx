import { useLoaderData, useNavigation } from 'react-router-dom';
import { Standings } from '../components/Standings/Standings';
import { Loader } from '../components/Loaders/Loader';

export const StandingsPage = () => {
	const standings = useLoaderData();
	const navigation = useNavigation();

	return navigation.state === 'loading' ? (
		<Loader />
	) : (
		<Standings standings={standings} />
	);
};

export const loader = async ({ params }) => {
	const id = params.id;

	const response = await fetch(`/.netlify/functions/standings?id=${id}`);

	if (!response.ok) {
		return response;
	}

	const standings = await response.json();

	return standings;
};
