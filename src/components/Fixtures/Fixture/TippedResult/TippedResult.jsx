import styles from './TippedResult.module.css';

export const TippedResult = ({ homeScore, awayScore }) => {
	return (
		<p className={styles.tippedResult}>
			Obstawiony wynik:{' '}
			<span>
				{homeScore}:{awayScore}
			</span>
		</p>
	);
};
