/**
 * Print the success message after adding a skill
 * @param {string} skillName - Name of the skill that was added
 */
function printSuccessMessage(skillName) {
  const version = '1.0.0';
  const skillPath = `skills/${skillName}`;
  
  const boxWidth = 49;
  const topBorder = '┌' + '─'.repeat(boxWidth) + '┐';
  const bottomBorder = '└' + '─'.repeat(boxWidth) + '┘';
  const separator = '─'.repeat(boxWidth);
  
  const headerText = `  DRIP  v${version}`;
  const padding = ' '.repeat(boxWidth - headerText.length);
  
  console.log('');
  console.log(topBorder);
  console.log(`│${headerText}${padding}│`);
  console.log(bottomBorder);
  console.log('');
  console.log(`  ✓ ${skillName} installed`);
  console.log(`  ✓ Placed at: ${skillPath}/`);
  console.log('');
  console.log(`  ${separator}`);
  console.log('  NOW TELL YOUR AGENT:');
  console.log(`  ${separator}`);
  console.log('');
  console.log(`  "Read ${skillPath}/SKILL.md and follow`);
  console.log('  its instructions. Then redesign my UI to match');
  console.log('  this design system exactly."');
  console.log('');
  console.log(`  ${separator}`);
  console.log('');
}

module.exports = {
  printSuccessMessage
};
