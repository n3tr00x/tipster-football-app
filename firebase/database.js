import { database } from './firebase';
import { get, ref, remove, set, update } from 'firebase/database';
import { getUserUID } from './auth';

export const setTippedFixture = async tippedFixtureData => {
	const uid = await getUserUID();
	const tippedFixturesRef = ref(
		database,
		`/${uid}/fixtures/${tippedFixtureData.fixtureId}`
	);
	const { score, date, isPointsGranted, points } = tippedFixtureData;

	set(tippedFixturesRef, {
		date,
		score,
		isPointsGranted,
		points,
	});
};

export const setUsername = async username => {
	const uid = await getUserUID();
	const usernameRef = ref(database, `/${uid}/username`);

	set(usernameRef, username);
};

export const removeTippedFixture = async id => {
	const uid = await getUserUID();
	const tippedFixtureRef = ref(database, `/${uid}/fixtures/${id}`);

	remove(tippedFixtureRef);
};

export const updateTippedFixture = async (id, tippedFixtureData) => {
	const uid = await getUserUID();
	const tippedFixtureRef = ref(database, `/${uid}/fixtures/${id}`);
	const { score } = tippedFixtureData;

	update(tippedFixtureRef, {
		score,
	});
};

export const getTippedFixturesOnGivenDay = async date => {
	const tippedFixtures = await getTippedFixtures();

	const allTippedFixtures = Object.keys(tippedFixtures).map(key => ({
		id: +key,
		...tippedFixtures[key],
	}));

	const fixturesOnGivenDay = allTippedFixtures.filter(
		fixture => fixture.date === date
	);
	return fixturesOnGivenDay;
};

export const getFixturesWithUnassignedPoints = async () => {
	const tippedFixtures = await getTippedFixtures();

	const allTippedFixtures = Object.keys(tippedFixtures).map(key => ({
		id: +key,
		...tippedFixtures[key],
	}));

	const unassignedFixtures = allTippedFixtures.filter(
		fixture => fixture.isPointsGranted === false
	);

	return unassignedFixtures;
};

export const updateGrantedPoints = async (id, points) => {
	const uid = await getUserUID();
	const tippedFixtureRef = ref(database, `/${uid}/fixtures/${id}`);

	const snapshot = await get(tippedFixtureRef);
	if (!snapshot.exists()) {
		return 'error';
	}
	const data = await snapshot.val();

	await update(tippedFixtureRef, {
		isPointsGranted: true,
		points: data.points + points,
	});
};

export const getScoredPoints = async () => {
	const fixtures = await getTippedFixtures();

	const fixturesArray = Object.keys(fixtures).map(key => ({
		id: +key,
		...fixtures[key],
	}));

	const points = fixturesArray.reduce((previousValue, currentValue) => {
		return previousValue + currentValue.points;
	}, 0);

	return points;
};

export const getLeaderboards = async () => {
	const usersRef = ref(database, '/');

	const snapshot = await get(usersRef);
	if (!snapshot.exists()) {
		return new Error('Nie znaleziono użytkownika!');
	}
	const data = await snapshot.val();
	const users = Object.keys(data).map(user => ({
		id: user,
		...data[user],
	}));

	const leaderboardData = users.map(user => {
		const username = user.username;
		const fixtures = user.fixtures ? Object.values(user.fixtures) : [];

		const points = fixtures.reduce((previousValue, currentValue) => {
			return previousValue + currentValue.points;
		}, 0);

		return {
			id: user.id,
			username,
			points,
		};
	});

	return leaderboardData.sort((a, b) => b.points - a.points);
};

const getTippedFixtures = async () => {
	const userId = await getUserUID();
	const dataRef = ref(database, `${userId}/fixtures`);

	const snapshot = await get(dataRef);
	if (!snapshot.exists()) {
		return [];
	}
	const data = await snapshot.val();

	return data;
};
