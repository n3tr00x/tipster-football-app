import { useRouteError } from 'react-router-dom';
import { Navigation } from '../components/Navigation/Navigation';
import { Error } from '../components/Error/Error';

export const ErrorPage = () => {
	const { error, status } = useRouteError();

	return (
		<>
			<Navigation />
			<main>
				<Error message={error.message} code={status} />
			</main>
		</>
	);
};
