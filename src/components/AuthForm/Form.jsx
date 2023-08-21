import { Form, Link, useActionData, useNavigation } from 'react-router-dom';
import { useValidateForm } from '../../hooks/useValidateForm';
import { FormLoader } from '../Loaders/FormLoader';
import styles from './Form.module.css';

export const AuthForm = ({ isSignUpForm, isInputFieldsFilled }) => {
	const feedbackMessage = useActionData();

	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';

	const isSubmittingSignUpForm = isSubmitting ? <FormLoader /> : 'Zarejestruj się';
	const isSubmittingSignInForm = isSubmitting ? <FormLoader /> : 'Zaloguj się';

	const { isAnyFieldEmpty, handleInputChange } = useValidateForm(isInputFieldsFilled);

	const accountQuestion = isSignUpForm ? (
		<span>
			Masz już konto? <Link to="/sign-in">Zaloguj się!</Link>
		</span>
	) : (
		<span>
			Nie masz konta? <Link to="/sign-up">Zarejestruj się!</Link>
		</span>
	);

	return (
		<div className={styles['form-container']}>
			<Form method="POST" className={styles.form}>
				<h2 className={styles.title}>{isSignUpForm ? 'rejestracja' : 'logowanie'}</h2>
				<div className={styles.row}>
					<p className={styles.error}>
						{!feedbackMessage?.isFormDataValid && feedbackMessage?.message}
					</p>
					<p className={styles.valid}>
						{feedbackMessage?.isFormDataValid && feedbackMessage?.message}
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
				{isSignUpForm && (
					<div className={styles.row}>
						<label htmlFor="username">Nazwa użytkownika</label>
						<input
							type="text"
							id="username"
							name="username"
							onChange={handleInputChange}
							required
						/>
					</div>
				)}
				<div className={styles.row}>
					<label htmlFor="password">Hasło</label>
					<input
						type="password"
						id="password"
						name="password"
						onChange={handleInputChange}
						required
					/>
				</div>
				{isSignUpForm && (
					<div className={styles.row}>
						<label htmlFor="confirmPassword">Powtórz hasło</label>
						<input
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							onChange={handleInputChange}
							required
						/>
					</div>
				)}
				<div className={styles.row}>
					<button className={styles.submit} disabled={isAnyFieldEmpty}>
						{isSignUpForm ? isSubmittingSignUpForm : isSubmittingSignInForm}
					</button>
				</div>
				<div className={styles.row}>
					<p className={styles['forgot-password']}>
						{!isSignUpForm && <Link to="/forgot-password">Zapomniałeś hasła?</Link>}
					</p>
				</div>
				<div className={styles.row}>
					<div className={styles.divider}>
						<hr />
						<span>albo</span>
					</div>
				</div>
				<div className={styles.row}>
					<p className={styles['account-question']}>{accountQuestion}</p>
				</div>
			</Form>
		</div>
	);
};
