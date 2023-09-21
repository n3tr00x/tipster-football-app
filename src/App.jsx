import { AuthProvider } from './contexts/Auth';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// layouts
import { RootLayout } from './layouts/Root';
import {
	StandingsLayout,
	loader as standingsLoader,
} from './layouts/StandingsLayout';
import {
	TipLayout,
	loader as unassignedFixturesLoader,
} from './layouts/TipLayout';
// pages
import { ErrorPage } from './pages/Error';
import { HomePage, loader as pointsLoader } from './pages/Home';
import { SignUpPage, action as signUpAction } from './pages/SignUp';
import { SignInPage, action as signInAction } from './pages/SignIn';
import {
	ForgotPasswordPage,
	action as forgotPasswordAction,
} from './pages/ForgotPassword';
import {
	StandingsPage,
	loader as standingsDetailsLoader,
} from './pages/Standings';
import {
	TipPage,
	loader as fixturesLoader,
	action as fixturesAction,
} from './pages/Tip';
import {
	SelectedFixturePage,
	action as fixtureAction,
} from './pages/SelectedFixture';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <HomePage />,
				loader: pointsLoader,
			},
			{
				path: 'sign-in',
				element: <SignInPage />,
				action: signInAction,
			},
			{
				path: 'sign-up',
				element: <SignUpPage />,
				action: signUpAction,
			},
			{
				path: 'forgot-password',
				element: <ForgotPasswordPage />,
				action: forgotPasswordAction,
			},
			{
				path: 'standings',
				element: <StandingsLayout />,
				loader: standingsLoader,
				children: [
					{
						path: ':id',
						element: <StandingsPage />,
						loader: standingsDetailsLoader,
					},
				],
			},
			{
				path: 'tip',
				element: <TipLayout />,
				loader: unassignedFixturesLoader,
				children: [
					{
						path: ':date',
						element: <TipPage />,
						loader: fixturesLoader,
						action: fixturesAction,
						children: [
							{
								path: ':fixtureId',
								element: <SelectedFixturePage />,
								action: fixtureAction,
							},
						],
					},
				],
			},
		],
	},
]);

const App = () => {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	);
};

export default App;
