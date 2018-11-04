# ads-token-gen
An NPM module for generating OAuth2 credentails for Google Adword API

## How to get `client_d` and `client_secret`

- Follow the [instructions here](https://developers.google.com/adwords/api/docs/guides/authentication)

## Installation

```bash
$ npm install -g ads-token-gen
```

Or you can install as a _dev-dependency_ and use `npx` instead.

## Usage

Start by generating the Authentication URL by running:

```bash
$ export AW_CLIENT_ID=client_id
$ export AW_CLIENT_SECRET=clent_secret
```

```bash
$ ads-token-gen --gen_url
```

The `auth url` will be generated and copied to the clipboard. Paste it on your browser.

Follow the authorization directions and copy the code generated (at the final stage). Use the code obtained in the command below:

```bash
$ ads-token-gen --code <code>
```
