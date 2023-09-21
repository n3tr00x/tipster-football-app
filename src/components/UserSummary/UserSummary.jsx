import styles from './UserSummary.module.css';

export const UserSummary = ({ username, avatar, points }) => {
	const infltectedWord =
		points === 0 || points > 4 || points < -4
			? 'punktów'
			: points === 1 || points === -1
			? 'punkt'
			: 'punkty';

	return (
		<div className={styles.userSummary}>
			<div className={styles.avatar}>
				<img src={avatar} alt="avatar" />
				<p>
					Witaj <span>{username}</span>
				</p>
			</div>
			<div className={styles.points}>
				Masz <span>{points}</span> {infltectedWord}
			</div>
		</div>
	);
};
