import styles from './Team.module.css';

export const TeamContainer = ({ children }) => {
	return <div className={styles.team}>{children}</div>;
};
