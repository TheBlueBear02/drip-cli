const fs = require('fs');
const path = require('path');
const { removeSkill } = require('./remove');
const { addSkill } = require('./add');

/**
 * Update an existing skill to the latest version from the registry
 * @param {string} skillName - Name of the skill to update
 */
async function updateSkill(skillName) {
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      console.error('Error: package.json not found in current directory');
      console.error('Please run this command in a project directory with package.json');
      process.exit(1);
    }

    const skillPath = path.join(process.cwd(), 'skills', skillName);

    if (!fs.existsSync(skillPath)) {
      console.error(`Error: Skill "${skillName}" not found at ${skillPath}`);
      console.error('Use "drip add <skill-name>" to add it first.');
      process.exit(1);
    }

    console.log(`Updating skill "${skillName}"...`);
    removeSkill(skillName);
    await addSkill(skillName);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  updateSkill
};
