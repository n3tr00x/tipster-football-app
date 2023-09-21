import { updateProfileDetails } from '../../firebase/auth';

export const action = async ({ request }) => {
	const data = await request.formData();
	const username = data.get('username');

	if (username === '') {
		return { message: 'Przekazano puste pole. Podaj nazwe użytkownika' };
	}

	const updatedData = {
		displayName: username.trim(),
	};

	updateProfileDetails(updatedData);

	return { message: 'Pomyślnie zaktualizowano nazwę użytkownika.' };
};
