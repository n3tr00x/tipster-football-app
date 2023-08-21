import { AuthForm } from '../components/AuthForm/Form';
import { json } from 'react-router-dom';
import { registerUser } from '../../firebase/auth';

export const SignUpPage = () => {
	return (
		<AuthForm
			isSignUpForm={true}
			isInputFieldsFilled={{
				email: false,
				username: false,
				password: false,
				confirmPassword: false,
			}}
		/>
	);
};

export const action = async ({ request }) => {
	try {
		const data = await request.formData();

		const userData = {
			email: data.get('email'),
			username: data.get('username'),
			password: data.get('password'),
			confirmPassword: data.get('confirmPassword'),
		};

		await registerUser(userData);

		return json(
			{
				isFormDataValid: true,
				message:
					'Pomyślnie stworzono konto. Potwierdź je klikając w link wysłany na email.',
			},
			{ status: 201 }
		);
	} catch (error) {
		return error;
	}
};
