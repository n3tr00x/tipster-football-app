import { redirect } from 'react-router-dom';

import { SelectedFixture } from '../components/Fixtures/SelectedFixture/SelectedFixture';
import { setTippedFixture, updateTippedFixture } from '../../firebase/database';

export const SelectedFixturePage = () => {
	return <SelectedFixture />;
};

export const action = async ({ request, params }) => {
	const { fixtureId, date } = params;

	const data = await request.formData();
	const homeScore = data.get('homeScore');
	const awayScore = data.get('awayScore');
	const startingAt = data.get('startingAt');

	if (new Date(startingAt) < new Date()) {
		alert('Nie możesz obstawić tego meczu, ponieważ został on rozpoczęty!');
		return redirect('..');
	}

	const tippedFixture = {
		fixtureId: +fixtureId,
		date,
		score: {
			home: +homeScore,
			away: +awayScore,
		},
		isPointsGranted: false,
		points: 0,
	};

	if (request.method === 'PATCH') {
		updateTippedFixture(fixtureId, tippedFixture);
	}
	if (request.method === 'POST') {
		setTippedFixture(tippedFixture);
	}

	return redirect('..');
};
