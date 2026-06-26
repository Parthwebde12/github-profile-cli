'use strict';

const ora = require('ora');
const { fetchRepos } = require('../api/github');
const { displayProfile, displayRepos, displayError } = require('../utils/display');

async function searchUser(username) {
  const spinner = ora(`Looking up @${username}...`).start();

  try {
    const [user, repos] = await Promise.all([
    //   fetchUser(username),
      fetchRepos(username),
    ]);

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