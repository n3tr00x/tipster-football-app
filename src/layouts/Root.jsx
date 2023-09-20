import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/Navigation/Navigation';

export const RootLayout = () => {
	return (
		<>
			<Navigation />
			<main>
				<div className="wrapper">
					<Outlet />
				</div>
			</main>
		</>
	);
};
