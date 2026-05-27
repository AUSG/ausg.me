const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const ACTIVITY_DIR = path.join(ROOT, 'src/_pages/Activities');
const MAX_DIRECT_ACTIVITY_IMG_USES = 0;

const walk = dir =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    if (!/\.(tsx?|jsx?)$/.test(entry.name)) return [];
    return [fullPath];
  });

const files = walk(ACTIVITY_DIR);
const directImgUses = files.flatMap(file => {
  const source = fs.readFileSync(file, 'utf8');
  return source.includes('<img') ? [path.relative(ROOT, file)] : [];
});

if (directImgUses.length > MAX_DIRECT_ACTIVITY_IMG_USES) {
  console.error('Activity photos must use next/image through ActivityImage.');
  directImgUses.forEach(file => console.error(`- ${file}`));
  process.exit(1);
}

const activityImage = fs.readFileSync(
  path.join(ACTIVITY_DIR, 'ActivityImage.tsx'),
  'utf8'
);
const requiredSnippets = [
  'layout="fill"',
  'sizes={sizes}',
  'objectFit="cover"',
];
const missingSnippets = requiredSnippets.filter(
  snippet => !activityImage.includes(snippet)
);

if (missingSnippets.length > 0) {
  console.error('ActivityImage is missing required optimization props.');
  missingSnippets.forEach(snippet => console.error(`- ${snippet}`));
  process.exit(1);
}

console.log(
  'Image payload audit passed: activity photos use next/image sizing.'
);
