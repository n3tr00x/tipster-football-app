import { Fixture } from './Fixture/Fixture';
import styles from './Fixtures.module.css';

export const Fixtures = ({ fixtures, tippedFixtures }) => {
	if (fixtures.isError) {
		return <p className={styles.error}>{fixtures.message}</p>;
	}

	const content = fixtures.map(fixture => {
		const tippedFixture = tippedFixtures.find(
			tippedFixture => tippedFixture.id === fixture.id
		);
		return (
			<Fixture
				key={fixture.id}
				fixture={fixture}
				tippedFixture={tippedFixture}
			/>
		);
	});

	return <div className={styles.fixtures}>{content}</div>;
};
