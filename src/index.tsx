// eslint-disable-next-line spaced-comment
/*@preserve
// ==UserScript==
// @name        Latitude Statement Downloader
// @namespace   https://github.com/desaiuditd/latitude-statement-downloader
// @version     [VI]{{inject}}[/VI]
// @description Download transaction statements in CSV from Latitude 28 Degrees Credit Card accounts.
// @author      Udit Desai
// @match       https://servicecentre.latitudefinancial.com.au/credit-card-account
// @grant       GM_addElement
// @require     https://cdn.jsdelivr.net/gh/CoeJoder/waitForKeyElements.js@v1.2/waitForKeyElements.js
// @require     https://unpkg.com/react@18/umd/react.production.min.js
// @require     https://unpkg.com/react-dom@18/umd/react-dom.production.min.js
// @updateURL   http://127.0.0.1:8080/index.js
// ==/UserScript==
*/

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './components/app';

const TAB_LIST_SELECTOR = 'ul.react-tabs__tab-list';

const init = () => {
	const tabList = document.querySelector( TAB_LIST_SELECTOR );

	if ( tabList === null ) {
		return;
	}

	const rootEl = document.createElement( 'div' );
	rootEl.id = 'lsd-root';
	tabList.parentNode?.insertBefore( rootEl, tabList.nextSibling );

	const rootElement = document.getElementById( 'lsd-root' );
	if ( rootElement === null ) {
		return;
	}

	// Add small css utility.
	GM_addElement(
		'link',
		{
			href: 'https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css',
			rel: 'stylesheet',
		},
	);

	const root = createRoot( rootElement );
	root.render(

		<StrictMode>
			<App />
		</StrictMode>,
	);
};

waitForKeyElements( TAB_LIST_SELECTOR, () => {
	init();
} );
