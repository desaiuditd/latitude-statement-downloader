import React, { FC } from 'react';

import { Txn, useGenerateCsvData } from '../hooks/transactions';

interface DownloadLinkProps {
	txns: Txn[];
	fileName: string;
}

export const DownloadLink: FC<DownloadLinkProps> = ({ txns, fileName }) => {
	const csvData = useGenerateCsvData(txns);
	const href = `data:application/csv;charset=utf-8,${encodeURIComponent(csvData)}`;

	return txns.length > 0 ? (
		<a download={fileName} href={href}>
			Download
		</a>
	) : (
		<span style={{ color: 'lightgrey' }}>Download</span>
	);
};
