//hooks
import { useEffect, useState } from 'react';
//react router dom
import { Link, useNavigate, useParams } from 'react-router-dom';
//icons
import leftArrow from '../../assets/left-arrow.svg';
import rightArrow from '../../assets/right-arrow.svg';
//styles
import { datePicker, pickDate, specificDate } from './DatePicker.module.css';

const formatDate = date => {
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');

	return `${year}-${month}-${day}`;
};

const calculatePreviousDay = date => {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() - 1);

	return formatDate(newDate);
};

const calculateNextDay = date => {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + 1);

	return formatDate(newDate);
};

export const DatePicker = () => {
	const { date } = useParams();
	const navigate = useNavigate();

	const [selectedDate, setSelectedDate] = useState({
		yesterday: calculatePreviousDay(date || formatDate(new Date())),
		today: date || formatDate(new Date()),
		tomorrow: calculateNextDay(date || formatDate(new Date())),
	});

	useEffect(() => {
		const today = date ? new Date(date) : new Date();
		const formattedDate = formatDate(today);

		navigate(formattedDate);
	}, [date, navigate]);

	const handleNextDay = () => {
		const nextDay = calculateNextDay(date);

		setSelectedDate({
			yesterday: calculatePreviousDay(nextDay),
			today: nextDay,
			tomorrow: calculateNextDay(nextDay),
		});
	};

	const handlePreviousDay = () => {
		const previousDay = calculatePreviousDay(date);

		setSelectedDate({
			yesterday: calculatePreviousDay(previousDay),
			today: previousDay,
			tomorrow: calculateNextDay(previousDay),
		});
	};

	const handlePickedDate = event => {
		const pickedDate = event.target.value;

		navigate(pickedDate);

		setSelectedDate({
			yesterday: calculatePreviousDay(pickedDate),
			today: pickedDate,
			tomorrow: calculateNextDay(pickedDate),
		});
	};

	return (
		<div className={datePicker}>
			<div className={pickDate}>
				<Link to={selectedDate.yesterday} onClick={handlePreviousDay}>
					<img src={leftArrow} alt="" />
				</Link>
				<span>{selectedDate.today}</span>
				<Link to={selectedDate.tomorrow} onClick={handleNextDay}>
					<img src={rightArrow} alt="" />
				</Link>
			</div>
			<div className={specificDate}>
				<input
					type="date"
					value={selectedDate.today}
					onChange={handlePickedDate}
				/>
			</div>
		</div>
	);
};
