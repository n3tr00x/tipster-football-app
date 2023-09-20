import { Emblem } from './Emblem';
import styles from './Team.module.css';
import { TeamContainer } from './TeamContainer';

export const Team = ({ name, image, position }) => {
	const currentPosition = position ? `(${position})` : '';

	return (
		<TeamContainer>
			<Emblem image={image} altText={`${name} emblem`} />
			<p className={styles.teamName}>{`${name} ${currentPosition}`}</p>
		</TeamContainer>
	);
};
