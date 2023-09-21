import styles from './Team.module.css';

export const Emblem = ({ image, altText }) => {
	return (
		<div className={styles.emblemBackground}>
			<img src={image} alt={altText} />
		</div>
	);
};
