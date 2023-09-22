import { Team } from './Team';

import styles from './Standings.module.css';

export const Standings = ({ standings }) => {
	return (
		<table className={styles.standings}>
			<thead>
				<tr>
					<th>Pozycja</th>
					<th>Drużyna</th>
					<th>Mecze</th>
					<th>Wygrane</th>
					<th>Remis</th>
					<th>Porażki</th>
					<th>Bramki</th>
					<th>Różnica bramek</th>
					<th>Punkty</th>
				</tr>
			</thead>
			<tbody>
				{standings.map(team => (
					<Team key={team.id} data={team} />
				))}
			</tbody>
		</table>
	);
};
