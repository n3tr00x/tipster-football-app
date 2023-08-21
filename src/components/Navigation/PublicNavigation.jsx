import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

export const PublicNavigation = () => {
	return (
		<nav className={styles.navigation}>
			<ul>
				<li className={styles.item}>
					<NavLink
						to="/sign-in"
						className={({ isActive }) => (isActive ? styles.active : null)}>
						Zaloguj się
					</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink
						to="/sign-up"
						className={({ isActive }) => (isActive ? styles.active : null)}>
						Zarejestruj się
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};
