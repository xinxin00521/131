import { execSync } from 'child_process';
try {
  execSync('git checkout src/components/ShortVideoFeeds.tsx', { stdio: 'inherit' });
} catch (e) {
  console.log(e.message);
}
