import styles from './Error.module.css';

export const Error = ({ message, code }) => {
	return (
		<div className={styles.error}>
			<p>{message}</p>
			<p className={styles.code}>
				kod błędu: <span>{code}</span>
			</p>
		</div>
	);
};
