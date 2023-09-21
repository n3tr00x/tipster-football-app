import { useSubmit } from 'react-router-dom';

export const Logout = () => {
	const submit = useSubmit();

	const handleLogout = () => {
		const proceed = confirm('Czy na pewno chcesz się wylogować?');

		if (proceed) {
			submit(null, { action: '/logout', method: 'POST' });
		}
	};

	return <button onClick={handleLogout}>Wyloguj</button>;
};
