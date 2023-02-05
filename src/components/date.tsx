import React, { ChangeEvent, FC } from 'react';

interface DateProps {
	id: string;
	label: string;
	date: string;
	onChange: ( e: ChangeEvent<HTMLInputElement> ) => void;
}

export const Date: FC<DateProps> = ( { date, onChange, id, label } ) => {
	return (
		<div className="mr3">
			<label className="mr1" htmlFor={ id }>{ label }</label>
			<input
				id={ id }
				onChange={ onChange }
				type="date"
				value={ date }
			/>
		</div>
	);
};
