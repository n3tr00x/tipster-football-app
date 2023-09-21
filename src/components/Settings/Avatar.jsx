import { useContext, useEffect } from 'react';
import { useFetcher } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth';
import styles from './FormUpdate.module.css';

export const Avatar = () => {
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
			action="/change-avatar">
			<label htmlFor="avatar">Avatar</label>
			<div className={styles.formContent}>
				<input
					type="url"
					id="avatar"
					name="avatar"
					defaultValue={user?.photoURL}
				/>
				<button>Zmień</button>
			</div>
		</fetcher.Form>
	);
};
