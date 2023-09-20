/* eslint-disable no-undef */
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

const { VITE_SPORTMONKS_BASE_URL, VITE_SPORTMONKS_API_KEY } = process.env;

export const handler = async () => {
	try {
		const response = await axios.get(
			`${VITE_SPORTMONKS_BASE_URL}/leagues`,
			{
				params: {
					select: 'name,image_path',
					include: 'currentseason:id,name',
				},
				headers: {
					'Authorization': VITE_SPORTMONKS_API_KEY,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
			}
		);

		const rawData = camelcaseKeys(response.data.data, { deep: true });

		const leagues = rawData.map(league => ({
			id: league.id,
			image: league.imagePath,
			currentSeasonId: league.currentseason.id,
		}));

		return {
			statusCode: 200,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(leagues),
		};
	} catch (error) {
		return { statusCode: 500, body: error.toString() };
	}
};
