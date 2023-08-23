import { AuthProvider } from './contexts/Auth';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './pages/Root';
import { ErrorPage } from './pages/Error';
import { HomePage } from './pages/Home';
import { SignUpPage, action as signUpAction } from './pages/SignUp';
import { SignInPage, action as signInAction } from './pages/SignIn';
import { ForgotPasswordPage, action as forgotPasswordAction } from './pages/ForgotPassword';

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
