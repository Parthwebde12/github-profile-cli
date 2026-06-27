'use strict';

const ora = require('ora');
const chalk = require('chalk');
const { fetchUser, fetchRepos } = require('../api/GITHUB');
const { displayProfile, displayRepos, displayError } = require('../utils/display');
const { saveToCache, readFromCache } = require('../utils/cache');

async function searchUser(username) {
  const spinner = ora(`Looking up @${username}...`).start();

  try {const cached = readFromCache(username);
if (cached) {spinner.succeed(`Loaded @${username} from cache ${chalk.gray('(cached)')}`);
      displayProfile(cached.user);
      displayRepos(cached.repos, 5);
      return;
    } 
    const [user, repos] = await Promise.all([
      fetchUser(username),
      fetchRepos(username),
    ]);
saveToCache(username, { user, repos });
spinner.succeed(`Found profile for @${username}`);
    displayProfile(user);
    displayRepos(repos, 5);

  } catch (error) {
    spinner.fail('Could not load profile.');
    displayError(error.message);
    process.exit(1);
  }
}

module.exports = { searchUser };