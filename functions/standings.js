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
	include: 'participant:name,image_path;details.type',
};

const getSpecificDetailValue = (detailsArray, codeDetail) => {
	const specificDetail = detailsArray.find(
		detail => detail.type.code === codeDetail
	);
	return specificDetail.value;
};

export const handler = async event => {
	try {
		const id = event.queryStringParameters.id;

		const response = await axios.get(
			`${SPORTMONKS_BASE_URL}/standings/seasons/${id}`,
			{
				headers,
				params,
			}
		);

		const rawData = camelcaseKeys(response.data.data, { deep: true });
		const standingsData = rawData.map(
			({ id, position, points, participant, details }) => ({
				id,
				position,
				points,
				teamName: participant.name,
				emblem: participant.imagePath,
				overallMatchesPlayed: getSpecificDetailValue(
					details,
					'overall-matches-played'
				),
				overallWins: getSpecificDetailValue(details, 'overall-won'),
				overallDraws: getSpecificDetailValue(details, 'overall-draw'),
				overallLost: getSpecificDetailValue(details, 'overall-lost'),
				overallGoalsScored: getSpecificDetailValue(
					details,
					'overall-goals-for'
				),
				overallGoalsConceded: getSpecificDetailValue(
					details,
					'overall-goals-against'
				),
				goalDiffrence: getSpecificDetailValue(
					details,
					'goal-difference'
				),
			})
		);

		return {
			statusCode: 200,
			body: JSON.stringify(standingsData),
		};
	} catch (error) {
		return { statusCode: 500, body: error.toString() };
	}
};
