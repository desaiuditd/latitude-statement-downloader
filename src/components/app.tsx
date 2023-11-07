import React, { FC, useState } from 'react';

import { getCsvFileName, useParseTxns, usePayer } from '../hooks/transactions';

import { DatePicker } from './date';
import { DownloadLink } from './download-link';

const TXNS_DATE_SELECTOR = 'p.chakra-text.css-nxzops';

const formatDate = (d: Date) => {
	const dateFormat = new Intl.DateTimeFormat(undefined, {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});

	const parts = dateFormat.formatToParts(d);
	const year = parts.find(({ type }) => type === 'year');
	const month = parts.find(({ type }) => type === 'month');
	const day = parts.find(({ type }) => type === 'day');

	return `${year.value}-${month.value}-${day.value}`;
};

export const App: FC = () => {
	const payer = usePayer();
	const [fileName, setFileName] = useState<string>(getCsvFileName(payer));
	const [startDate, setStartDate] = useState<string>();
	const [endDate, setEndDate] = useState<string>();
	const txns = useParseTxns(startDate, endDate);

	const availableDates = Array.from(document.querySelectorAll(TXNS_DATE_SELECTOR)).map(el =>
		Number(new Date(el.textContent)),
	);

	const minDate = formatDate(new Date(Math.min.apply(null, availableDates)));
	const maxDate = formatDate(new Date(Math.max.apply(null, availableDates)));

	return (
		<div className="flex justify-between mt3">
			<h5>Export: </h5>
			<div className="flex justify-around">
				<DatePicker
					date={startDate}
					id="lsd-start-date"
					label="Start date:"
					max={maxDate}
					min={minDate}
					onChange={_e => {
						setStartDate(_e.currentTarget.value);
						setFileName(getCsvFileName(payer));
					}}
				/>
				<DatePicker
					date={endDate}
					id="lsd-end-date"
					label="End date:"
					max={maxDate}
					min={minDate}
					onChange={_e => {
						setEndDate(_e.currentTarget.value);
						setFileName(getCsvFileName(payer));
					}}
				/>
				<DownloadLink fileName={fileName} txns={txns} />
			</div>
		</div>
	);
};
