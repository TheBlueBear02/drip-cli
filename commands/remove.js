const fs = require('fs');
const path = require('path');

/**
 * Remove a skill from the current project
 * @param {string} skillName - Name of the skill to remove
 */
function removeSkill(skillName) {
  try {
    const skillPath = path.join(process.cwd(), 'skills', skillName);
    
    if (!fs.existsSync(skillPath)) {
      console.log(`Skill "${skillName}" not found at ${skillPath}`);
      process.exit(0);
    }
    
    // Remove the skill folder
    fs.rmSync(skillPath, { recursive: true, force: true });
    
    console.log(`✓ Skill "${skillName}" removed successfully`);
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  removeSkill
};
