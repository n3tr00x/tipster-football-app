import { Form, useActionData, useNavigation } from 'react-router-dom';
import { useValidateForm } from '../../hooks/useValidateForm';
import { FormLoader } from '../Loaders/FormLoader';
import styles from './Form.module.css';

export const ChangePasswordForm = () => {
	const feedbackMessage = useActionData();
	const { isAnyFieldEmpty, handleInputChange } = useValidateForm({
		password: false,
		confirmPassword: false,
		currentPassword: false,
	});

	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';

	const resetForm = event => {
		event.target.reset();
	};

	return (
		<div className={styles['form-container']}>
			<Form method="POST" className={styles.form} onSubmit={resetForm}>
				<h2 className={styles.title}>nowe hasło</h2>
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
					<label htmlFor="currentPassword">Aktualne hasło</label>
					<input
						type="password"
						id="currentPassword"
						name="currentPassword"
						onChange={handleInputChange}
						autoFocus
						required
					/>
				</div>
				<div className={styles.row}>
					<label htmlFor="password">Nowe hasło</label>
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
					<label htmlFor="confirmPassword">Potwierdź hasło</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						onChange={handleInputChange}
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
