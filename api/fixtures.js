/* eslint-disable no-undef */
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

const { VITE_SPORTMONKS_BASE_URL, VITE_SPORTMONKS_API_KEY } = process.env;

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
			`${VITE_SPORTMONKS_BASE_URL}/fixtures${endpoint}`,
			{
				params: {
					select: 'starting_at',
					include: 'state;scores;participants:name,image_path',
					timezone: 'Europe/Warsaw',
				},
				headers: {
					'Authorization': VITE_SPORTMONKS_API_KEY,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
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
