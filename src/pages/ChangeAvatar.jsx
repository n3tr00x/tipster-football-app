import { updateProfileDetails } from '../../firebase/auth';

export const action = async ({ request }) => {
	const data = await request.formData();
	const avatar = data.get('avatar');

	const updatedData = {
		photoURL: avatar.trim(),
	};

	if (avatar === '') {
		updateProfileDetails({
			photoURL:
				'https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_1280.png',
		});
	} else {
		updateProfileDetails(updatedData);
	}

	return { message: 'Pomyślnie zaktualizowano avatar.' };
};
