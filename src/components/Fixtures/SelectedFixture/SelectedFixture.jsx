import Popup from 'reactjs-popup';
import { Form, useLocation, useNavigate } from 'react-router-dom';

import { SelectedTeam } from './SelectedTeam';
import styles from './SelectedFixture.module.css';

export const SelectedFixture = () => {
	const { state } = useLocation();
	const navigate = useNavigate();

	const closePopupHandler = () => navigate(-1);

	return (
		<Popup open onClose={closePopupHandler} modal>
			<div className={styles.fixture}>
				<Form method={state.tippedFixtureId ? 'PATCH' : 'POST'}>
					<div className={styles.details}>
						<input
							type="hidden"
							defaultValue={state.startingAt}
							name="startingAt"
						/>
						<SelectedTeam
							teamName={state.home.name}
							image={state.home.image}
							tippedScore={state.home.score}
							position={state.home.position}
							inputName="homeScore"
						/>
						<SelectedTeam
							teamName={state.away.name}
							image={state.away.image}
							tippedScore={state.away.score}
							position={state.away.position}
							inputName="awayScore"
						/>
					</div>
					<button className={styles.tipButton}>
						Zatwierdź wynik
					</button>
				</Form>
			</div>
		</Popup>
	);
};
