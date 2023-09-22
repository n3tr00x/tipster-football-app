export const Team = ({ data }) => {
	const {
		position,
		teamName,
		emblem,
		overallMatchesPlayed,
		overallWins,
		overallDraws,
		overallLosts,
		overallGoalsScored,
		overallGoalsConceded,
		goalDiffrence,
		points,
	} = data;

	return (
		<tr>
			<td>{position}</td>
			<td>
				<img src={emblem} alt="" />
				<span>{teamName}</span>
			</td>
			<td>{overallMatchesPlayed}</td>
			<td>{overallWins}</td>
			<td>{overallDraws}</td>
			<td>{overallLosts}</td>
			<td>{`${overallGoalsScored}:${overallGoalsConceded}`}</td>
			<td>{goalDiffrence}</td>
			<td>{points}</td>
		</tr>
	);
};
