const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');

/**
 * Extract a specific skill folder from the zip file
 * @param {Buffer} zipBuffer - The zip file buffer
 * @param {string} skillName - Name of the skill to extract
 * @param {string} targetDir - Target directory (usually ./skills)
 * @returns {Promise<string>} Path to the extracted skill folder
 */
async function extractSkillFolder(zipBuffer, skillName, targetDir) {
  const zip = new AdmZip(zipBuffer);
  const zipEntries = zip.getEntries();
  
  // GitHub zips have structure: repo-name-main/skill-name/file.txt
  // Find entries that belong to the skill folder
  const skillTargetPath = path.join(targetDir, skillName);
  
  // Ensure target directory exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  let foundSkill = false;
  
  // Extract all files for this skill
  for (const entry of zipEntries) {
    if (entry.isDirectory) {
      continue;
    }
    
    const entryPath = entry.entryName;
    const parts = entryPath.split('/');
    
    // Find the skill name in the path (skip the repo-name-main prefix)
    const skillIndex = parts.findIndex(p => p === skillName);
    
    if (skillIndex !== -1 && skillIndex < parts.length - 1) {
      foundSkill = true;
      
      // Get the path relative to the skill folder
      const relativePath = parts.slice(skillIndex + 1).join('/');
      const targetPath = path.join(skillTargetPath, relativePath);
      const targetDirPath = path.dirname(targetPath);
      
      // Create directory if it doesn't exist
      if (!fs.existsSync(targetDirPath)) {
        fs.mkdirSync(targetDirPath, { recursive: true });
      }
      
      // Write the file
      fs.writeFileSync(targetPath, entry.getData());
    }
  }
  
  if (!foundSkill) {
    throw new Error(`Skill folder "${skillName}" not found in the repository`);
  }
  
  return skillTargetPath;
}

module.exports = {
  extractSkillFolder
};
