import { useEffect, useState } from 'react';
import styles from './ScoredPoints.module.css';

export const ScoredPoints = ({ points }) => {
	const [pointsColor, setPointsColor] = useState(styles.green);

	useEffect(() => {
		switch (points) {
			case -3:
				setPointsColor(styles.red);
				break;
			case 10:
				setPointsColor(styles.gold);
				break;
			case 5:
			default:
				setPointsColor(styles.green);
		}
	}, [points]);

	return <div className={pointsColor}>{points} punkty</div>;
};
