# ads-token-gen
An NPM module for generating OAuth2 credentails for Google Adword API

Start by generating the Authentication URL by running:

```bash
$ node index.js --client_id <client-id> --client_secret <client-secret> --gen_url
```

After concent, copy the code generated and use it with the command below:

```bash
$ node index.js --code <code>
```

## How to get `client_d` and `client_secret`

- Follow the [instructions here](https://developers.google.com/adwords/api/docs/guides/authentication)

## Usage

