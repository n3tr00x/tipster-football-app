import styles from './Leaderboard.module.css';

export const Leaderboard = ({ users }) => {
	return (
		<table className={styles.leaderboard}>
			<thead>
				<tr>
					<th>Pozycja</th>
					<th>Nazwa użytkownika</th>
					<th>Zdobyte punkty</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user, index) => (
					<tr key={user.id}>
						<td>{index + 1}</td>
						<td>{user.username}</td>
						<td>{user.points}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
