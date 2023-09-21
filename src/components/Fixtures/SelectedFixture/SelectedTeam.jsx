import { TeamContainer } from '../Fixture/Team/TeamContainer';
import { TipScore } from './TipScore';

import styles from './SelectedFixture.module.css';

export const SelectedTeam = ({
	teamName,
	image,
	tippedScore,
	inputName,
	position,
}) => {
	const currentPosition = position ? `(${position})` : '';

	return (
		<TeamContainer>
			<TipScore
				image={image}
				altText={`${teamName} emblem`}
				value={tippedScore}
				inputName={inputName}
			/>
			<p className={styles.teamName}>
				{`${teamName} ${currentPosition}`}
			</p>
		</TeamContainer>
	);
};
