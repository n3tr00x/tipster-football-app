import { NavLink } from 'react-router-dom';
import home from '../../assets/home.svg';
import ball from '../../assets/ball.svg';
import standings from '../../assets/standings.svg';
import settings from '../../assets/settings.svg';

import styles from './Navigation.module.css';

export const LoggedInNavigation = () => {
	return (
		<nav className={styles.navigation}>
			<ul>
				<li className={styles.item}>
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive ? styles.active : null
						}>
						<span>Panel główny </span>
						<img src={home} alt="" />
					</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink
						to="/tip"
						className={({ isActive }) =>
							isActive ? styles.active : null
						}>
						<span>Typuj</span>
						<img src={ball} alt="" />
					</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink
						to="/standings"
						className={({ isActive }) =>
							isActive ? styles.active : null
						}>
						<span>Tabele</span>
						<img src={standings} alt="" />
					</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink
						to="/settings"
						className={({ isActive }) =>
							isActive ? styles.active : null
						}>
						<span>Ustawienia</span>
						<img src={settings} alt="" />
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};
