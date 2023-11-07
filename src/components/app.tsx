import React, { FC, useState } from 'react';

import { getCsvFileName, useParseTxns, usePayer } from '../hooks/transactions';

import { DatePicker } from './date';
import { DownloadLink } from './download-link';

export const App: FC = () => {
	const payer = usePayer();
	const [fileName, setFileName] = useState<string>(getCsvFileName(payer));
	const [startDate, setStartDate] = useState<string>();
	const [endDate, setEndDate] = useState<string>();
	const txns = useParseTxns(startDate, endDate);

	return (
		<div className="flex justify-between mt3">
			<h5>Export: </h5>
			<div className="flex justify-around">
				<DatePicker
					date={startDate}
					id="lsd-start-date"
					label="Start date:"
					onChange={_e => {
						setStartDate(_e.currentTarget.value);
						setFileName(getCsvFileName(payer));
					}}
				/>
				<DatePicker
					date={endDate}
					id="lsd-end-date"
					label="End date:"
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
