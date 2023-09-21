import { json } from 'react-router-dom';
import { ChangePasswordForm } from '../components/Forms/ChangePassword';
import { updateUserPassword } from '../../firebase/auth';
import { auth } from '../../firebase/firebase';

export const ChangePasswordPage = () => {
	return <ChangePasswordForm />;
};

export const action = async ({ request }) => {
	try {
		const data = await request.formData();

		const userData = {
			email: auth.currentUser.email,
			currentPassword: data.get('currentPassword'),
			password: data.get('password'),
			confirmPassword: data.get('confirmPassword'),
		};

		await updateUserPassword(userData);

		return json(
			{
				isFormDataValid: true,
				message: 'Poprawnie zmieniono adres e-mail.',
			},
			{ status: 201 }
		);
	} catch (error) {
		return error;
	}
};
