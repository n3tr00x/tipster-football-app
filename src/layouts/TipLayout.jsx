import { Suspense, useEffect, useState } from 'react';
import {
	Await,
	Outlet,
	defer,
	useAsyncValue,
	useLoaderData,
} from 'react-router-dom';
import { DatePicker } from '../components/DatePicker/DatePicker';
import { ProtectedRoute } from '../components/ProtectedRoute';
import {
	getFixturesWithUnassignedPoints,
	updateGrantedPoints,
} from '../../firebase/database';
import { analyzeResult } from '../utilities/analyzeResult';
import { Loader } from '../components/Loaders/Loader';

const handleGrantingPoints = (fixtures, fixturesWithNoGrantedPoints) => {
	if (fixtures.isError) return;

	fixtures.forEach(fixture => {
		const tippedFixture = fixturesWithNoGrantedPoints.find(
			tippedFixture => tippedFixture.id === fixture.id
		);

		const realResult = {
			home: fixture.score.home,
			away: fixture.score.away,
		};

		const userPrediction = {
			home: tippedFixture?.score.home.toString(),
			away: tippedFixture?.score.away.toString(),
		};

		if (
			fixture.state.code === 'FT' &&
			userPrediction.home &&
			userPrediction.away
		) {
			const points = analyzeResult(realResult, userPrediction);
			updateGrantedPoints(fixture.id, points);
		}
	});
};

export const TipLayout = () => {
	const { fixturesWithNoGrantedPoints } = useLoaderData();

	return (
		<ProtectedRoute>
			<Suspense fallback={<Loader />}>
				<Await resolve={fixturesWithNoGrantedPoints}>
					<GrantPoints />
				</Await>
				<DatePicker />
				<Outlet />
			</Suspense>
		</ProtectedRoute>
	);
};

const GrantPoints = () => {
	const [isGrantedPoints, setIsGrantedPoints] = useState(false);
	const { fixtures, fixturesWithNoGrantedPoints } = useAsyncValue();

	useEffect(() => {
		if (!isGrantedPoints) {
			handleGrantingPoints(fixtures, fixturesWithNoGrantedPoints);
		}
		setIsGrantedPoints(true);
	}, [isGrantedPoints, fixtures, fixturesWithNoGrantedPoints]);
};

export const loader = () => {
	const fixturesWithNoGrantedPoints = getFixturesWithNoGrantedPoints();

	return defer({
		fixturesWithNoGrantedPoints,
	});
};

const getFixturesWithNoGrantedPoints = async () => {
	const fixturesWithNoGrantedPoints = await getFixturesWithUnassignedPoints();
	const fixturesIdsWithNoGrantedPoints = fixturesWithNoGrantedPoints.map(
		fixture => fixture.id
	);

	const response = await fetch(
		`/.netlify/functions/fixtures?fixtureIds=${fixturesIdsWithNoGrantedPoints.join(
			','
		)}`
	);
	const fixtures = await response.json();

	return {
		fixtures,
		fixturesWithNoGrantedPoints,
	};
};
