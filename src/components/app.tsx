import React, { FC, useState } from 'react';

import { useParseTxns, usePayer, getCsvFileName } from '../hooks/transactions';

import { Date } from './date';
import { DownloadLink } from './download-link';

export const App: FC = () => {
	const payer = usePayer();
	const [ fileName, setFileName ] = useState<string>( getCsvFileName( payer ) );
	const [ startDate, setStartDate ] = useState<string>();
	const [ endDate, setEndDate ] = useState<string>();
	const txns = useParseTxns( startDate, endDate );

	return (
		<div className="flex justify-between mt3">
			<h5>Export: </h5>
			<div className="flex justify-around">
				<Date
					date={ startDate }
					id="lsd-start-date"
					label="Start date:"
					onChange={ e => {
						setStartDate( e.currentTarget.value );
						setFileName( getCsvFileName( payer ) );
					} }
				/>
				<Date
					date={ endDate }
					id="lsd-end-date"
					label="End date:"
					onChange={ e => {
						setEndDate( e.currentTarget.value );
						setFileName( getCsvFileName( payer ) );
					} }
				/>
				<DownloadLink
					fileName={ fileName }
					txns={ txns }
				/>
			</div>
		</div>
	);
};
