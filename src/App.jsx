import { AuthProvider } from './contexts/Auth';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// layouts
import { RootLayout } from './layouts/Root';
import {
	StandingsLayout,
	loader as standingsLoader,
} from './layouts/StandingsLayout';
// pages
import { ErrorPage } from './pages/Error';
import { HomePage } from './pages/Home';
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

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <HomePage />,
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
