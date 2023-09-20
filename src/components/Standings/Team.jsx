export const Team = ({ data }) => {
	const {
		position,
		teamName,
		overallMatchesPlayed,
		overallGoalsScored,
		overallGoalsConceded,
		points,
	} = data;

	return (
		<tr>
			<td>{position}</td>
			<td>{teamName}</td>
			<td>{overallMatchesPlayed}</td>
			<td>{`${overallGoalsScored}:${overallGoalsConceded}`}</td>
			<td>{points}</td>
		</tr>
	);
};
