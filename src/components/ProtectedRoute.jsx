import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/Auth';
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate('/sign-in');
		}
	}, [user, navigate]);

	return <>{children}</>;
};
