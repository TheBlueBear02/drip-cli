# drip-cli
Stop shipping generic AI UIs. Use npx getdrip to add drip to your project.

## Style skills constraint

You can only have **one GetDRIP style skill per project**.

- **Add**: `npx getdrip add <style-skill-name>`
- **List**: `npx getdrip list`
- **Remove**: `npx getdrip remove <style-skill-name>`
- **Update** `npx getdrip update <style-skill-name>`

If you try to add a second style skill (for example, adding `clay-premium` after `art-deco`), the CLI will refuse to install it and print:
