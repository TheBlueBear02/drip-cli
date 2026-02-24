const fetch = require('node-fetch');

const POSTHOG_API_KEY = 'phc_RE2H5Eza6X6DxDeIqvzPipQ8jij0p3kDaZriYy3ohVs';
const POSTHOG_HOST = 'https://eu.i.posthog.com';

/**
 * Track a skill download event. Fire-and-forget — never throws.
 * @param {string} skillName
 */
async function trackDownload(skillName) {
  try {
    await fetch(`${POSTHOG_HOST}/capture/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: POSTHOG_API_KEY,
        event: 'skill_downloaded',
        distinct_id: 'cli-anonymous',
        properties: {
          skill: skillName,
          cli_version: require('../package.json').version
        }
      })
    });
  } catch {
    // Silent fail — analytics must never block the user
  }
}

module.exports = { trackDownload };
