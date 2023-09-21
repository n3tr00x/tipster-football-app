//components
import { Actions } from './Actions/Actions';
import { Result } from './Result/Result';
import { ScoredPoints } from './ScoredPoints/ScoredPoints';
import { Team } from './Team/Team';
import { TippedResult } from './TippedResult/TippedResult';
//styles
import styles from './Fixture.module.css';

export const Fixture = ({ fixture, tippedFixture }) => {
	const { teams } = fixture;

	const selectedFixture = {
		startingAt: fixture.startingAt,
		tippedFixtureId: tippedFixture?.id,
		home: {
			name: teams.home.name,
			image: teams.home.image,
			position: teams.home.position,
			score: tippedFixture?.score.home,
		},
		away: {
			name: teams.away.name,
			image: teams.away.image,
			position: teams.away.position,
			score: tippedFixture?.score.away,
		},
	};

	return (
		<div className={styles.fixture}>
			{tippedFixture?.isPointsGranted && (
				<ScoredPoints points={tippedFixture.points} />
			)}
			<div className={styles.details}>
				<Team
					name={teams.home.name}
					image={teams.home.image}
					position={teams.home.position}
				/>
				<Result
					startingAt={fixture.startingAt}
					homeScore={fixture.score.home}
					awayScore={fixture.score.away}
					state={fixture.state.name}
				/>
				<Team
					name={teams.away.name}
					image={teams.away.image}
					position={teams.away.position}
				/>
			</div>
			{fixture.state.code === 'NS' && (
				<Actions
					fixtureId={fixture.id}
					isTippedFixture={tippedFixture ? true : false}
					selectedFixture={selectedFixture}
				/>
			)}
			{tippedFixture && (
				<TippedResult
					homeScore={tippedFixture.score.home}
					awayScore={tippedFixture.score.away}
				/>
			)}
		</div>
	);
};
