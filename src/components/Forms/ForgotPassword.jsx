import { Form, useActionData, useNavigation } from 'react-router-dom';
import { useValidateForm } from '../../hooks/useValidateForm';
import { FormLoader } from '../Loaders/FormLoader';
import styles from './Form.module.css';

export const ForgotPasswordForm = () => {
	const feedbackMessage = useActionData();
	const { isAnyFieldEmpty, handleInputChange } = useValidateForm({
		email: false,
	});

	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';

	return (
		<div className={styles['form-container']}>
			<Form method="POST" className={styles.form}>
				<h2 className={styles.title}>zapomniałeś hasła?</h2>
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
