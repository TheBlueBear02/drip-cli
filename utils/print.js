/**
 * Print the success message after adding a skill
 * @param {string} skillName - Name of the skill that was added
 */
function printSuccessMessage(skillName) {
  const version = '1.1.0';
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
  console.log(`  ✓ agent-frontend-instruction.md created at project root`);
  console.log(`  ✓ CLAUDE.md, .cursorrules, .windsurfrules updated`);
  console.log('');
  console.log(`  ${separator}`);
  console.log('  Your project is configured with the ${skillName} design system.');
  console.log(`  ${separator}`);
  console.log('');
  console.log('  To redesign existing UI, tell your agent:');
  console.log('');
  console.log(`  "Read ${skillPath}/SKILL.md and redesign`);
  console.log('  the existing UI to match this design system."');
  console.log('');
  console.log(`  ${separator}`);
  console.log('');
}

module.exports = {
  printSuccessMessage
};
