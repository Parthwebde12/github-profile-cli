'use strict';

const axios = require('axios');

const BASE_URL = 'https://api.github.com';
async function fetchUser(username) {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' },
      timeout: 10000,
    });
    return response.data;

  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error(`User "${username}" not found on GitHub.`);
      }
      if (error.response.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Wait a few minutes and try again.');
      }
      throw new Error(`GitHub API error: ${error.response.status}`);
    }
    throw new Error(`Network error: ${error.message}`);
  }
}

async function fetchRepos(username) {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}/repos`, {
      params: { sort: 'updated', per_page: 100 },
      headers: { 'Accept': 'application/vnd.github.v3+json' },
      timeout: 10000,
    });
    return response.data.sort((a, b) => b.stargazers_count - a.stargazers_count);

  } catch (error) {
    throw new Error(`Could not fetch repositories: ${error.message}`);
  }
}

module.exports = { fetchRepos, fetchUser };