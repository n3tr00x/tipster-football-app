import { redirect } from 'react-router-dom';
import { updateUserEmail } from '../../firebase/auth';
import { ChangeEmailForm } from '../components/Forms/ChangeEmail';

export const ChangeEmailPage = () => {
	return <ChangeEmailForm />;
};

export const action = async ({ request }) => {
	try {
		const data = await request.formData();

		const userData = {
			email: data.get('email'),
			password: data.get('password'),
		};

		await updateUserEmail(userData);
		alert(
			'Nastąpiło wylogowanie! Zaloguj się na konto używająć nowego adresu e-mail'
		);

		return redirect('/sign-in');
	} catch (error) {
		return error;
	}
};
