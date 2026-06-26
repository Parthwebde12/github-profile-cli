'use strict';

const chalk = require('chalk');

function printDivider() {
    console.log(chalk.gray('─'.repeat(50)));
}

function displayProfile(user) {
    console.log('');
    printDivider();
    console.log(chalk.bold.white(`${user.name || user.login}`));
    console.log(chalk.cyan(`  @${user.login}`));

    if (user.bio) {
        console.log('');
        console.log(chalk.italic.white(`  "${user.bio}"`));
    }

    printDivider();
    console.log(chalk.bold.yellow(' Stats'));
    console.log('');
    console.log(`${chalk.green('Followers:')}${chalk.white(user.followers)}`);
    console.log(`${chalk.green('Following:')}${chalk.white(user.following)}`);
    console.log(`${chalk.green('Public Repos:')}${chalk.white(user.public_repos)}`);
    printDivider();

    console.log(chalk.bold.yellow('Details'));
    console.log('');

    if (user.location) {
        console.log(`${chalk.blue('Location:')}${chalk.white(user.location)}`);
    }
    if (user.company) {
        console.log(`${chalk.blue('Company:')}${chalk.white(user.company)}`);
    }
    if (user.blog) {
        console.log(`${chalk.blue(' Website:')}${chalk.white(user.blog)}`);
    }

    const joined = new Date(user.created_at).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
    });
    console.log(`${chalk.blue('Joined:')}${chalk.white(joined)}`);
    console.log(`  ${chalk.blue('Profile:')}${chalk.underline.cyan(user.html_url)}`);
    printDivider();
    console.log('');
}

function displayRepos(repos, limit = 5) {
    if (repos.length === 0) {
        console.log(chalk.yellow('  No public repositories found.'));
        return;
    }

    console.log(chalk.bold.yellow(`   Top ${limit} Repositories`));
    console.log('');

    repos.slice(0, limit).forEach((repo, i) => {
        const lang = repo.language ? chalk.magenta(`[${repo.language}]`) : chalk.gray('[No language]');
        console.log(`  ${chalk.bold.white(`${i + 1}. ${repo.name}`)}${lang}`);
        if (repo.description) {
            console.log(` ${chalk.gray(repo.description)}`);
        }
        console.log(`${chalk.yellow(` ${repo.stargazers_count}`)} ${chalk.blue(`🍴 ${repo.forks_count}`)}`);
        console.log(`${chalk.underline.cyan(repo.html_url)}`);
        console.log('');
    });

    printDivider();
    console.log('');
}

function displayError(message) {
    console.log('');
    console.log(chalk.red(`Error: ${message}`));
    console.log('');
}

module.exports = { displayProfile, displayRepos, displayError };