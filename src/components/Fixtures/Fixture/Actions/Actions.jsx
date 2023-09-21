import { Link, useSubmit } from 'react-router-dom';
import styles from './Actions.module.css';

export const Actions = ({ fixtureId, isTippedFixture, selectedFixture }) => {
	const submit = useSubmit();

	const removeTipHandler = () => {
		const proceed = confirm('Czy na pewno chcesz usunąć ten typ?');

		if (proceed) {
			submit({ id: fixtureId }, { method: 'DELETE' });
		}
	};

	return (
		<div className={styles.actionContainer}>
			<Link
				to={`${fixtureId}`}
				state={selectedFixture}
				className={styles.tipButton}>
				{!isTippedFixture ? 'Obstaw mecz' : 'Edytuj'}
			</Link>
			{isTippedFixture && (
				<button
					className={styles.removeTippedFixture}
					onClick={removeTipHandler}>
					Usuń
				</button>
			)}
		</div>
	);
};
