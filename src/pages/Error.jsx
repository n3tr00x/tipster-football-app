import { useRouteError } from 'react-router-dom';
import { Navigation } from '../components/Navigation/Navigation';

export const ErrorPage = () => {
	const { statusText } = useRouteError();

	return (
		<>
			<Navigation />
			<main>
				<h2>Błąd!</h2>
				<p>{statusText}</p>
			</main>
		</>
	);
};
