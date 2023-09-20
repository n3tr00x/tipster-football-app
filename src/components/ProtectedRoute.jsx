import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/Auth';
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
	const { user, isLoading } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user && !isLoading) {
			navigate('/sign-in');
		}
	}, [user, navigate, isLoading]);

	return <>{children}</>;
};
