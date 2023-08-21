import { useRedirect } from '../hooks/useRedirect';

export const LandingPage = () => {
	useRedirect('/');

	return <h1>Dołącz do grona społeczności obstawiającej mecze!</h1>;
};
