import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/Auth';
import { useNavigate } from 'react-router-dom';

export const useRedirect = path => {
	const user = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate(path);
		}
	}, [navigate, user, path]);
};
