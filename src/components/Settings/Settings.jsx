import { Link } from 'react-router-dom';
import { Username } from './Username';
import { Avatar } from './Avatar';
import { Logout } from './Logout';

import styles from './Settings.module.css';

export const Settings = () => {
	return (
		<div className={styles.container}>
			<div className={styles.action}>
				<Username />
			</div>
			<div className={styles.action}>
				<Avatar />
			</div>
			<div className={styles.action}>
				<Logout />
			</div>
			<div className={styles.action}>
				<Link to="change-email">Zmień email</Link>
			</div>
			<div className={styles.action}>
				<Link to="change-password">Zmień hasło</Link>
			</div>
		</div>
	);
};
