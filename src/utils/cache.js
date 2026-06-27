'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');

// stored in your home directory so it works on any OS

const CACHE_DIR = path.join(os.homedir(), '.github-profile-cli', 'cache');

// Cache expires after 1 hr
const CACHE_TTL = 60 * 60 * 1000;

// Make sure the cache folder exists when this file is loaded
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}


function getCacheFilePath(username) {
  return path.join(CACHE_DIR, `${username}.json`);
}


function saveToCache(username, data) {
  const cacheFile = getCacheFilePath(username);
  const payload = {
    savedAt: Date.now(),  // current time in milliseconds
    data: data,
  };
  fs.writeFileSync(cacheFile, JSON.stringify(payload, null, 2));
}


function readFromCache(username) {
  const cacheFile = getCacheFilePath(username);


  if (!fs.existsSync(cacheFile)) {
    return null;
  }

  const payload = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
  const age = Date.now() - payload.savedAt;

  
  if (age > CACHE_TTL) {
    return null;
  }

  return payload.data;
}


function clearCache(username) {
  const cacheFile = getCacheFilePath(username);
  if (fs.existsSync(cacheFile)) {
    fs.unlinkSync(cacheFile);
  }
}

module.exports = { saveToCache, readFromCache, clearCache };