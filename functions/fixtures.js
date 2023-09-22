/* eslint-disable no-undef */
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

const { SPORTMONKS_BASE_URL, SPORTMONKS_API_KEY } = process.env;

const headers = {
	'Authorization': SPORTMONKS_API_KEY,
	'Accept': 'application/json',
	'Content-Type': 'application/json',
};

const params = {
	select: 'starting_at',
	include: 'state;scores;participants:name,image_path',
	timezone: 'Europe/Warsaw',
};

export const handler = async event => {
	try {
		const { date, fixtureIds } = event.queryStringParameters;
		let endpoint;

		if (date) {
			endpoint = `/date/${date}`;
		}

		if (fixtureIds) {
			endpoint = `/multi/${fixtureIds}`;
		}

		const response = await axios.get(
			`${SPORTMONKS_BASE_URL}/fixtures${endpoint}`,
			{
				headers,
				params,
			}
		);

		if (!response.data.data) {
			throw new Error('Nie znaleziono meczów w wybranym dniu!');
		}

		const rawData = camelcaseKeys(response.data.data, { deep: true });

		const data = rawData.map(fixture => {
			const { participants, scores, state } = fixture;

			const teams = {
				home: selectParticipant(participants, 'home'),
				away: selectParticipant(participants, 'away'),
			};

			const score = {
				home: selectScore(scores, 'home'),
				away: selectScore(scores, 'away'),
			};

			const fixtureState = {
				name: state.name,
				code: state.state,
			};

			return {
				id: fixture.id,
				startingAt: fixture.startingAt,
				score,
				teams,
				state: fixtureState,
			};
		});

		return {
			statusCode: 200,
			body: JSON.stringify(data),
		};
	} catch (error) {
		return {
			statusCode: 404,
			body: JSON.stringify({
				isError: true,
				message: error.message,
			}),
		};
	}
};

const selectScore = (scoresArray, ground) => {
	const selectedScore = scoresArray.find(
		score => score.typeId === 1525 && score.score.participant === ground
	);

	return selectedScore ? selectedScore.score.goals : null;
};

const selectParticipant = (participantsArray, ground) => {
	const selectedParticipant = participantsArray.find(
		participant => participant.meta.location === ground
	);

	const participant = {
		id: selectedParticipant.id,
		name: selectedParticipant.name,
		image: selectedParticipant.imagePath,
		position: selectedParticipant.meta.position,
		isWon: selectedParticipant.meta.winner,
	};

	return participant;
};
