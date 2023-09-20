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
