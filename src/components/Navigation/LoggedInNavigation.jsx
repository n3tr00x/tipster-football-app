import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

export const LoggedInNavigation = () => {
	return (
		<nav className={styles.navigation}>
			<ul>
				<li className={styles.item}>
					<NavLink to="/" className={({ isActive }) => (isActive ? styles.active : null)}>
						Home
					</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink
						to="/standings"
						className={({ isActive }) => (isActive ? styles.active : null)}>
						Tabele
					</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink
						to="/profile"
						className={({ isActive }) => (isActive ? styles.active : null)}>
						Profil
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};
