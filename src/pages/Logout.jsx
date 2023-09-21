import { redirect } from 'react-router-dom';
import { logout } from '../../firebase/auth';

export const action = () => {
	logout();
	return redirect('/sign-in');
};
