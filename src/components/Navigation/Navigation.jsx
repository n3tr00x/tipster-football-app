import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth';
import { LoggedInNavigation } from './LoggedInNavigation';
import { PublicNavigation } from './PublicNavigation';
import styles from './Navigation.module.css';

export const Navigation = () => {
	const { user } = useContext(AuthContext);

	return (
		<header className={styles.header}>
			<div className="wrapper">
				<div className={styles['header-container']}>
					<h1 className={styles.title}>typer piłkarski</h1>
					{user ? <LoggedInNavigation /> : <PublicNavigation />}
				</div>
			</div>
		</header>
	);
};
