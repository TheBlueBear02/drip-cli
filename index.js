#!/usr/bin/env node

const { addSkill } = require('./commands/add');
const { listSkills } = require('./commands/list');
const { removeSkill } = require('./commands/remove');

const command = process.argv[2];
const args = process.argv.slice(3);

switch (command) {
  case 'add':
    if (args.length === 0) {
      console.error('Error: Please provide a skill name');
      console.error('Usage: drip add <skill-name>');
      process.exit(1);
    }
    addSkill(args[0]);
    break;
  
  case 'list':
    listSkills();
    break;
  
  case 'remove':
    if (args.length === 0) {
      console.error('Error: Please provide a skill name');
      console.error('Usage: drip remove <skill-name>');
      process.exit(1);
    }
    removeSkill(args[0]);
    break;
  
  default:
    if (!command) {
      console.log('Usage: drip <command>');
      console.log('');
      console.log('Commands:');
      console.log('  add <skill-name>    Add a skill to your project');
      console.log('  list               List all available skills');
      console.log('  remove <skill-name> Remove a skill from your project');
    } else {
      console.error(`Unknown command: ${command}`);
      console.error('Usage: drip <command>');
    }
    process.exit(command ? 1 : 0);
}
