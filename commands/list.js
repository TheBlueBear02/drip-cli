const { fetchRegistry } = require('../utils/fetch');

async function listSkills() {
  try {
    const registry = await fetchRegistry();
    const skills = Array.isArray(registry) ? registry : registry.skills;

    if (!skills || skills.length === 0) {
      console.log('No skills available in the registry.');
      return;
    }

    console.log('');
    console.log('Available Skills:');
    console.log('');

    skills.forEach(skill => {
      console.log(`  ${skill.name} (v${skill.version || '1.0.0'})`);
      if (skill.description) {
        console.log(`    ${skill.description}`);
      }
      console.log('');
    });

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { listSkills };