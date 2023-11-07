// ! These selectors are hardcoded based on html markup on Latitude Portal website.
const TXNS_LIST_SELECTOR = 'div#transaction-list';
const TXNS_SELECTOR = `${TXNS_LIST_SELECTOR} div[data-testid="transaction"]`;

// ! .css-1m06lcz is for "Reward points" text.
// ! .css-1nr0svk is for "Reward points" hyphen.
const ACCT_INFO_SELECTOR = 'div[data-testid="credit-card-ending-7978-info"] p:not(.css-1m06lcz):not(.css-1nr0svk)';
const TXNS_DATE_SELECTOR = 'p.chakra-text.css-nxzops';

// ! .css-1lglxma is for debit.
// ! .css-ta310k is for credit.
const TXN_SELECTOR = '.chakra-stack.css-1lglxma,.chakra-stack.css-ta310k';
const TXN_DESCRIPTION_SELECTOR = 'div.css-1rr4qq7';
const TXN_AMOUNT_SELECTOR = 'div.chakra-stack.css-84zodg > div.css-0';

export const usePayer = () =>
	Array.from(document.querySelectorAll(ACCT_INFO_SELECTOR)).reduce((acc, p) => {
		const content = p.textContent?.trim() ?? '';

		// Bail, if the content is empty.
		if (!content) {
			return acc;
		}

		// Bail, if the content is currency number.
		if (content.includes('$')) {
			return acc;
		}

		// Bail, if the content is not in the deny list.
		const denyList = ['credit limit', 'current balance', 'available to spend'];
		if (denyList.includes(content.toLowerCase())) {
			return acc;
		}

		return acc + content;
	}, '');

export interface Txn {
	amount: string;
	description: string;
	payer: string;
	txnDate: Date;
}

export const useParseTxns = (startDateStr?: string, endDateStr?: string) => {
	const payer = usePayer();

	// Bail, if start date or end date is not valid.
	if (!startDateStr || !endDateStr) {
		return [];
	}

	const startDate = new Date(`${startDateStr} 00:00:00`);
	const endDate = new Date(`${endDateStr}  00:00:00`);

	const txns: Txn[] = [];

	for (const dateBucket of Array.from(document.querySelectorAll(TXNS_SELECTOR))) {
		const txnDateEl = dateBucket.querySelector(TXNS_DATE_SELECTOR);

		if (!txnDateEl) {
			return;
		}

		const txnDate = new Date(txnDateEl.textContent);

		// If the txn doesn't fall in between the date range, bail early.
		if (!(txnDate >= startDate && txnDate <= endDate)) {
			return;
		}

		for (const txnEl of Array.from(dateBucket.querySelectorAll(TXN_SELECTOR))) {
			const descEl = txnEl.querySelector(TXN_DESCRIPTION_SELECTOR);

			// Bail early, if we don't find the description.
			if (!descEl) {
				return;
			}

			const description = Array.from(descEl.childNodes)
				.reduce((acc, descChildEl) => `${acc} ${descChildEl.textContent}`, '')
				.trim();

			const amtEl = txnEl.querySelector(TXN_AMOUNT_SELECTOR);

			// Bail early, if we don't find the amount.
			if (!amtEl) {
				return;
			}

			const amount = amtEl.textContent.replace('$', '');

			// If this txn is pending, bail early.
			if (amount.toLowerCase().endsWith('pending')) {
				return;
			}

			txns.push({
				amount,
				description,
				payer,
				txnDate,
			});
		}
	}

	return txns;
};

export const useGenerateCsvData = (txns: Txn[]): string =>
	txns
		.map(txn => [txn.txnDate.toDateString(), txn.payer, txn.description, txn.amount].map(c => `"${c}"`).join(','))
		.join('\n');

export const getCsvFileName = (payer: string) => `transactions-${payer.replace(/\s/g, '-')}-${Date.now()}.csv`;
