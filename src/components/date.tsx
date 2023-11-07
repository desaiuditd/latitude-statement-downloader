import React, { ChangeEvent, FC } from 'react';

interface DateProps {
	date: string;
	id: string;
	label: string;
	max?: string;
	min?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const DatePicker: FC<DateProps> = ({ date, id, label, max, min, onChange }) => {
	return (
		<div className="mr3">
			<label className="mr1" htmlFor={id}>
				{label}
			</label>
			<input id={id} max={max} min={min} onChange={onChange} type="date" value={date} />
		</div>
	);
};
