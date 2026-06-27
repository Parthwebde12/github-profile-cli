# 🐙 github-profile-cli

A beginner-friendly CLI tool to explore any GitHub profile right from your terminal.

## Install

```bash
npm install -g github-profile-cli
```

## Usage

```bash
github-profile search <username>
```

## Examples

```bash
github-profile search torvalds
github-profile search sindresorhus
github-profile search YOUR_USERNAME
```

## What It Shows

-  Name, bio, location, company
- Followers, following, public repos
- Top 5 repositories sorted by stars
-  Account creation date
-  Caching — repeat searches are instant

## Features

- ✅ Colored terminal output
- ✅ Loading spinner
- ✅ Caching (1 hour — no wasted API calls)
- ✅ Graceful error handling
- ✅ Unit tested

## GitHub API Rate Limits

GitHub allows 60 requests/hour without a token.
To get 5,000/hour, add your token in `src/api/github.js`:

```js
'Authorization': `token YOUR_GITHUB_TOKEN`
```

Get a free token at: https://github.com/settings/tokens

## Tech Stack

- Node.js
- Commander.js — CLI commands
- Axios — API calls
- Chalk — colored output
- Ora — loading spinner
- Jest — unit tests

## Run Locally

```bash
git clone https://github.com/Parthwebde12/github-profile-cli.git
cd github-profile-cli
npm install
node src/index.js search parthwebde12
```

## Run Tests

```bash
npm test
```

## License

MIT