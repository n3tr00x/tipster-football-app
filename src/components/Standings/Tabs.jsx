import { NavLink } from 'react-router-dom';
import styles from './Tabs.module.css';

export const Tabs = ({ leagues }) => {
	return (
		<div className={styles.tabs}>
			{leagues.map(league => (
				<NavLink
					key={league.currentSeasonId}
					to={`${league.currentSeasonId}`}
					className={({ isActive }) =>
						isActive ? styles.active : null
					}>
					<img src={league.image} alt="" />
					<span>{league.name}</span>
				</NavLink>
			))}
		</div>
	);
};
