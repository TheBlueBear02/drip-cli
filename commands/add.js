const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { downloadRepoZip } = require('../utils/fetch');
const { extractSkillFolder } = require('../utils/extract');
const { printSuccessMessage } = require('../utils/print');

/**
 * Add a skill to the current project
 * @param {string} skillName - Name of the skill to add
 */
async function addSkill(skillName) {
  try {
    // Check if package.json exists
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      console.error('Error: package.json not found in current directory');
      console.error('Please run this command in a project directory with package.json');
      process.exit(1);
    }
    
    // Check if skill already exists
    const skillsDir = path.join(process.cwd(), 'skills');
    const skillPath = path.join(skillsDir, skillName);
    
    if (fs.existsSync(skillPath)) {
      console.log(`Skill "${skillName}" already exists at ${skillPath}`);
      console.log('Remove it first if you want to reinstall it.');
      process.exit(0);
    }
    
    // Download the repo zip
    const zipBuffer = await downloadRepoZip();
    
    // Extract the skill folder
    await extractSkillFolder(zipBuffer, skillName, skillsDir);
    
    // Read skill.json to check dependencies
    const skillJsonPath = path.join(skillPath, 'skill.json');
    if (!fs.existsSync(skillJsonPath)) {
      console.warn(`Warning: skill.json not found at ${skillJsonPath}`);
      printSuccessMessage(skillName);
      return;
    }
    
    const skillJson = JSON.parse(fs.readFileSync(skillJsonPath, 'utf8'));
    const projectPackageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Check for missing dependencies
    const dependencies = skillJson.dependencies || {};
    const missingDeps = [];
    
    const allDeps = {
      ...(projectPackageJson.dependencies || {}),
      ...(projectPackageJson.devDependencies || {})
    };
    
    for (const [depName, depVersion] of Object.entries(dependencies)) {
      if (!allDeps[depName]) {
        missingDeps.push(`${depName}@${depVersion}`);
      }
    }
    
    // Install missing dependencies
    if (missingDeps.length > 0) {
      console.log(`Installing missing dependencies: ${missingDeps.join(', ')}`);
      try {
        execSync(`npm install ${missingDeps.join(' ')}`, {
          stdio: 'inherit',
          cwd: process.cwd()
        });
      } catch (error) {
        console.warn('Warning: Failed to install some dependencies. You may need to install them manually.');
      }
    }
    
    // Print success message
    printSuccessMessage(skillName);
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  addSkill
};
