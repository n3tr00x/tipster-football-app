import { useContext } from 'react';
import { Form, useActionData, useNavigation } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth';

import { useValidateForm } from '../../hooks/useValidateForm';
import { FormLoader } from '../Loaders/FormLoader';
import styles from './Form.module.css';

export const ChangeEmailForm = () => {
	const { user } = useContext(AuthContext);
	const feedbackMessage = useActionData();
	const { isAnyFieldEmpty, handleInputChange } = useValidateForm({
		email: false,
		password: false,
	});

	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';

	return (
		<div className={styles['form-container']}>
			<Form method="POST" className={styles.form}>
				<h2 className={styles.title}>zmień e-mail</h2>
				<div className={styles.row}>
					<p className={styles.currentEmail}>
						Twój aktualny adres e-mail: {user?.email}
					</p>
				</div>
				<div className={styles.row}>
					<p className={styles.error}>
						{!feedbackMessage?.isFormDataValid &&
							feedbackMessage?.message}
					</p>
					<p className={styles.valid}>
						{feedbackMessage?.isFormDataValid &&
							feedbackMessage?.message}
					</p>
				</div>
				<div className={styles.row}>
					<label htmlFor="password">Podaj swoje hasło</label>
					<input
						type="password"
						id="password"
						name="password"
						onChange={handleInputChange}
						autoFocus
						required
					/>
				</div>
				<div className={styles.row}>
					<label htmlFor="email">Adres e-mail</label>
					<input
						type="email"
						id="email"
						name="email"
						onChange={handleInputChange}
						autoFocus
						required
					/>
				</div>
				<div className={styles.row}>
					<button
						className={styles.submit}
						disabled={isAnyFieldEmpty}>
						{isSubmitting ? <FormLoader /> : 'Prześlij'}
					</button>
				</div>
			</Form>
		</div>
	);
};
