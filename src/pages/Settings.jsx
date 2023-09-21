import { ProtectedRoute } from '../components/ProtectedRoute';
import { Settings } from '../components/Settings/Settings';

export const SettingsPage = () => {
	return (
		<ProtectedRoute>
			<Settings />
		</ProtectedRoute>
	);
};
