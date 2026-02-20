const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const GITHUB_USERNAME = 'TheBlueBear02'; // TODO: Replace with actual username
const REPO_NAME = 'drip-skills';
const BASE_URL = `https://github.com/${GITHUB_USERNAME}/${REPO_NAME}`;

/**
 * Download the main branch zip file from GitHub
 * @returns {Promise<Buffer>} The zip file buffer
 */
async function downloadRepoZip() {
  const zipUrl = `${BASE_URL}/archive/refs/heads/main.zip`;
  
  console.log(`Downloading from ${zipUrl}...`);
  const response = await fetch(zipUrl);
  
  if (!response.ok) {
    throw new Error(`Failed to download: ${response.status} ${response.statusText}`);
  }
  
  return await response.buffer();
}

/**
 * Fetch the registry.json file from GitHub
 * @returns {Promise<Object>} The registry JSON object
 */
async function fetchRegistry() {
  const registryUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/registry.json`;
  
  const response = await fetch(registryUrl);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch registry: ${response.status} ${response.statusText}`);
  }
  
  return await response.json();
}

module.exports = {
  downloadRepoZip,
  fetchRegistry
};
