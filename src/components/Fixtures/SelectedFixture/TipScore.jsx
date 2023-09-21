import { Emblem } from '../Fixture/Team/Emblem';
import { tipScore } from './SelectedFixture.module.css';

export const TipScore = ({ image, value, teamName, inputName }) => {
	return (
		<div className={tipScore}>
			<Emblem image={image} altText={`${teamName} emblem`} />
			<input
				type="number"
				defaultValue={value}
				name={inputName}
				required
			/>
		</div>
	);
};
