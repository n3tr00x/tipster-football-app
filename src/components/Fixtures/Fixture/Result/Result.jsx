import styles from './Result.module.css';

export const Result = ({ startingAt, homeScore, awayScore, state }) => {
	return (
		<div className={styles.result}>
			<p className={styles.startTime}>{startingAt}</p>
			<p className={styles.score}>
				{`${homeScore?.toString() || '-'}:${awayScore?.toString() || '-'}`}
			</p>
			<p className={styles.status}>{state}</p>
		</div>
	);
};
