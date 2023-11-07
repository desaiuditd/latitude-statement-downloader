# latitude-statement-downloader
Download transaction statements in CSV from Latitude 28 Degrees Credit Card accounts.

This is implemented as a userscript, to be used with Tampermonkey/Greasemonkey.

## Usage

- Clone the repo.
- `corepack enable`
- `yarn install`
- `yarn build`

Final script will be built inside `dist` directory.

Import the script inside Tampermonkey/Greasemonkey.

## Development

- `yarn watch`
- `yarn dlx http-server ./dist` (in a separate CLI Terminal window/tab)

Import the script inside Tampermonkey/Greasemonkey.

Now, watch task will keep generating new version of the script, as and when you make a change in the source of the script.

In the userscript meta tags, `@updateURL http://127.0.0.1:8080/index.js` is already added as the `@updateURL` endpoint.
We started that server already using `http-server`.

After you make every change, trigger Update in Tampermonkey/Greasemonkey to update the script. That's it!
