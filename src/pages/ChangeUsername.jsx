import { updateProfileDetails } from '../../firebase/auth';
import { setUsername } from '../../firebase/database';

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
	setUsername(username);

	return { message: 'Pomyślnie zaktualizowano nazwę użytkownika.' };
};
