const fs = require('fs');
const path = require('path');

const MARKER_START = '<!-- getdrip:start -->';
const MARKER_END = '<!-- getdrip:end -->';

const PLATFORM_FILES = [
  'CLAUDE.md',
  '.cursorrules',
  '.windsurfrules',
];

function buildBlock(skillName) {
  return `${MARKER_START}
## Frontend Design System — GetDRIP

This project uses the **${skillName}** design skill from GetDRIP.

Before creating or modifying any frontend UI, you MUST:
1. Read \`skills/${skillName}/SKILL.md\` — it contains the design laws and usage instructions.
2. Use only the design tokens defined in \`skills/${skillName}/tokens/\` (colors, typography, spacing, shadows, motion).
3. Follow the component patterns in \`skills/${skillName}/components/\` as reference.
4. Read \`skills/${skillName}/philosophy.md\` to understand the design intent and mood.

**Core rule:** Never introduce styles, colors, fonts, or visual patterns that contradict the skill's design system. Every UI element you create or edit must be consistent with the **${skillName}** design language.
${MARKER_END}`;
}

function injectBlock(content, block) {
  // If file already has a getdrip block, replace it
  if (content.includes(MARKER_START)) {
    return content.replace(
      new RegExp(`${escapeRegex(MARKER_START)}[\\s\\S]*?${escapeRegex(MARKER_END)}`),
      block
    );
  }
  // Otherwise append with a separator if the file already has content
  if (content.trim().length > 0) {
    return content.trimEnd() + '\n\n' + block + '\n';
  }
  return block + '\n';
}

function removeBlock(content) {
  return content
    .replace(
      new RegExp(`\\n?${escapeRegex(MARKER_START)}[\\s\\S]*?${escapeRegex(MARKER_END)}\\n?`),
      ''
    )
    .trimEnd();
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Inject the GetDRIP skill block into all platform agent files.
 * Creates the file if it doesn't exist, appends if it does.
 */
function injectAgentInstructions(skillName, projectRoot) {
  const block = buildBlock(skillName);

  for (const filename of PLATFORM_FILES) {
    const filePath = path.join(projectRoot, filename);
    const existing = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
    const updated = injectBlock(existing, block);
    fs.writeFileSync(filePath, updated, 'utf8');
  }
}

/**
 * Remove the GetDRIP block from all platform agent files.
 * Deletes the file if it becomes empty, leaves the rest of the content untouched.
 */
function removeAgentInstructions(projectRoot) {
  for (const filename of PLATFORM_FILES) {
    const filePath = path.join(projectRoot, filename);
    if (!fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes(MARKER_START)) continue;

    const updated = removeBlock(content);
    if (updated.trim().length === 0) {
      fs.rmSync(filePath);
    } else {
      fs.writeFileSync(filePath, updated + '\n', 'utf8');
    }
  }
}

module.exports = { injectAgentInstructions, removeAgentInstructions };
