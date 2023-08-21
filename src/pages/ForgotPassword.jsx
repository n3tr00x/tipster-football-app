import { ForgotPasswordForm } from '../components/AuthForm/ForgotPasswordForm';
import { json } from 'react-router-dom';
import { forgotPassword } from '../../firebase/auth';

export const ForgotPasswordPage = () => {
	return <ForgotPasswordForm />;
};

export const action = async ({ request }) => {
	try {
		const data = await request.formData();

		const userData = {
			email: data.get('email'),
		};

		await forgotPassword(userData);

		return json(
			{
				isFormDataValid: true,
				message: 'Poprawnie wysłano link do zmiany hasła na podany email.',
			},
			{ status: 201 }
		);
	} catch (error) {
		return error;
	}
};
