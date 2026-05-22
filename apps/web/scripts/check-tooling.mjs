import { existsSync } from 'node:fs';
import { join } from 'node:path';

const reactScriptsPath = join(process.cwd(), 'node_modules/react-scripts');

if (existsSync(reactScriptsPath)) {
  console.error(`
Stale Create React App tooling detected at:
  ${reactScriptsPath}

This project uses Vite. Remove old dependencies and reinstall:

  cd apps/web
  rm -rf node_modules build dist
  npm install
  npm run dev
`);
  process.exit(1);
}
