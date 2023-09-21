import { Suspense } from 'react';
import {
	Await,
	Outlet,
	defer,
	redirect,
	useAsyncValue,
	useLoaderData,
} from 'react-router-dom';
import {
	getTippedFixturesOnGivenDay,
	removeTippedFixture,
} from '../../firebase/database';
import { Fixtures } from '../components/Fixtures/Fixtures';

export const TipPage = () => {
	const { fixtures } = useLoaderData();

	const loadingText = (
		<p
			style={{
				fontSize: '1.6rem',
				textAlign: 'center',
			}}>
			Wczytywanie spotkań...
		</p>
	);

	return (
		<Suspense fallback={loadingText}>
			<Await resolve={fixtures}>
				<TipPageContent />
				<Outlet />
			</Await>
		</Suspense>
	);
};

const TipPageContent = () => {
	const fixtures = useAsyncValue();
	const [realFixtures, tippedFixtures] = fixtures;

	return <Fixtures fixtures={realFixtures} tippedFixtures={tippedFixtures} />;
};

const loadFixtures = async date => {
	const response = await fetch(`/api/fixtures?date=${date}`);
	const fixtures = await response.json();

	return fixtures;
};

const loadTippedFixtures = async date => {
	const tippedFixtures = await getTippedFixturesOnGivenDay(date);

	return tippedFixtures;
};

export const loader = ({ params }) => {
	const date = params.date;

	return defer({
		fixtures: Promise.all([loadFixtures(date), loadTippedFixtures(date)]),
	});
};

export const action = async ({ request }) => {
	const data = await request.formData();
	const id = data.get('id');

	removeTippedFixture(id);

	return redirect('.');
};
