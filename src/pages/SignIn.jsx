import { AuthForm } from '../components/AuthForm/Form';
import { redirect } from 'react-router-dom';
import { signIn } from '../../firebase/auth';

export const SignInPage = () => {
	return (
		<AuthForm
			isInputFieldsFilled={{
				email: false,
				password: false,
			}}
		/>
	);
};

export const action = async ({ request }) => {
	try {
		const data = await request.formData();

		const userData = {
			email: data.get('email'),
			password: data.get('password'),
		};

		await signIn(userData);

		return redirect('/');
	} catch (error) {
		return error;
	}
};
