'use strict';

jest.mock('axios');

const axios = require('axios');
const { fetchUser, fetchRepos } = require('../api/GITHUB');
const MOCK_USER = {
  login: 'torvalds',
  name: 'Linus Torvalds',
  bio: 'Just a random geek',
  followers: 231000,
  following: 0,
  public_repos: 8,
  created_at: '2011-09-03T15:26:22Z',
  html_url: 'https://github.com/torvalds',
};

const MOCK_REPOS = [
  { name: 'linux', stargazers_count: 186000, forks_count: 55000, language: 'C', description: 'Linux kernel', html_url: 'https://github.com/torvalds/linux' },
  { name: 'subsurface', stargazers_count: 2300, forks_count: 600, language: 'C++', description: 'Divelog', html_url: 'https://github.com/torvalds/subsurface' },
];

test('fetchUser returns user data', async () => {
  // Tell axios to return our fake data instead of hitting the real API
  axios.get.mockResolvedValueOnce({ data: MOCK_USER });

  const user = await fetchUser('torvalds');
  expect(user.login).toBe('torvalds');
  expect(user.followers).toBe(231000);
});

test('fetchUser throws error for unknown user', async () => {  axios.get.mockRejectedValueOnce({
    response: { status: 404, data: { message: 'Not Found' } },
  });

  await expect(fetchUser('thisuserdoesnotexist999')).rejects.toThrow('not found');
});

test('fetchUser throws error on rate limit', async () => {
  axios.get.mockRejectedValueOnce({
    response: { status: 403, data: { message: 'Forbidden' } },
  });

  await expect(fetchUser('torvalds')).rejects.toThrow('rate limit');
});

test('fetchRepos returns repos sorted by stars', async () => {
  const unsorted = [MOCK_REPOS[1], MOCK_REPOS[0]];
  axios.get.mockResolvedValueOnce({ data: unsorted });

  const repos = await fetchRepos('torvalds');
  expect(repos[0].name).toBe('linux'); // highest stars should be first
  expect(repos[0].stargazers_count).toBeGreaterThan(repos[1].stargazers_count);
});