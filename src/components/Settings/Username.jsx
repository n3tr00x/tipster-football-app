import { useContext, useEffect } from 'react';
import { useFetcher } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth';
import styles from './FormUpdate.module.css';

export const Username = () => {
	const { user } = useContext(AuthContext);
	const fetcher = useFetcher();
	const { data, state } = fetcher;

	useEffect(() => {
		if (state === 'idle' && data?.message) {
			alert(data.message);
		}
	}, [data, state]);

	return (
		<fetcher.Form
			className={styles.form}
			method="POST"
			action="/change-username">
			<label htmlFor="username">Nazwa użytkownika</label>
			<div className={styles.formContent}>
				<input
					type="text"
					id="username"
					name="username"
					defaultValue={user?.displayName}
					required
				/>
				<button>Zmień</button>
			</div>
		</fetcher.Form>
	);
};
