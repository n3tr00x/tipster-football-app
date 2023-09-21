export const analyzeResult = (realResult, userPrediction) => {
	if (
		realResult.home === userPrediction.home &&
		realResult.away === userPrediction.away
	) {
		return 10;
	}

	const realMatchWinner =
		realResult.home > realResult.away
			? 'home'
			: realResult.home < realResult.away
			? 'away'
			: 'draw';
	const userMatchWinner =
		userPrediction.home > userPrediction.away
			? 'home'
			: userPrediction.home < userPrediction.away
			? 'away'
			: 'draw';

	if (realMatchWinner === userMatchWinner) {
		return 5;
	}

	return -3;
};
