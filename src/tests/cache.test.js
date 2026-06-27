'use strict';

const { saveToCache, readFromCache, clearCache } = require('../utils/cache');


const TEST_USER = 'test_user_jest_123';

const MOCK_DATA = {
  user: {
    login: 'test_user_jest_123',
    name: 'Test User',
    bio: 'Just testing',
    followers: 10,
    following: 5,
    public_repos: 3,
    created_at: '2020-01-01T00:00:00Z',
    html_url: 'https://github.com/test_user_jest_123',
  },
  repos: [],
};

beforeEach(() => clearCache(TEST_USER));
afterEach(() => clearCache(TEST_USER));

test('returns null when no cache exists', () => {
  const result = readFromCache(TEST_USER);
  expect(result).toBeNull();
});

test('saves and reads back data correctly', () => {
  saveToCache(TEST_USER, MOCK_DATA);
  const result = readFromCache(TEST_USER);
  expect(result).not.toBeNull();
  expect(result.user.login).toBe('test_user_jest_123');
  expect(result.user.followers).toBe(10);
});

test('returns null when cache is expired', () => {
  const fs = require('fs');
  const path = require('path');
  const os = require('os');

  const CACHE_DIR = path.join(os.homedir(), '.github-profile-cli', 'cache');
  const cacheFile = path.join(CACHE_DIR, `${TEST_USER}.json`);

  const expiredPayload = {
    savedAt: Date.now() - 2 * 60 * 60 * 1000,
    data: MOCK_DATA,
  };

  fs.writeFileSync(cacheFile, JSON.stringify(expiredPayload));

  const result = readFromCache(TEST_USER);
  expect(result).toBeNull();
});

test('clears cache correctly', () => {
  saveToCache(TEST_USER, MOCK_DATA);
  clearCache(TEST_USER);
  const result = readFromCache(TEST_USER);
  expect(result).toBeNull();
});