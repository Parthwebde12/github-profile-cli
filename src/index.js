

'use strict';

const { Command } = require('commander');
const { searchUser } = require('./commands/search');

const program = new Command();

program
  .name('github-profile')
  .description('CLI tool to explore GitHub profiles')
  .version('1.0.0');

program
  .command('search <username>')
  .description('Search a GitHub user')
  .action((username) => {
    searchUser(username);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}