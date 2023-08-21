import { useState } from 'react';

export const useValidateForm = formData => {
	const [isFilled, setIsFilled] = useState(formData);

	const handleInputChange = event => {
		const { name, value } = event.target;
		const isInputFilled = value.trim() !== '';

		setIsFilled(prevData => ({
			...prevData,
			[name]: isInputFilled,
		}));
	};

	const isAnyFieldEmpty = !Object.values(isFilled).every(field => field === true);

	return {
		isAnyFieldEmpty,
		handleInputChange,
	};
};
