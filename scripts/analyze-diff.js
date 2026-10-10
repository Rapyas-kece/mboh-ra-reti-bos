import fs from 'fs';
import path from 'path';

async function analyzeDiff() {
  if (!fs.existsSync('test-results')) {
    console.log('No test-results directory found.');
    return;
  }
  const dirs = fs.readdirSync('test-results').filter((d) =>
    fs.statSync(path.join('test-results', d)).isDirectory()
  );
  if (dirs.length === 0) {
    console.log('No test result subdirectories found.');
    return;
  }

  const resultDir = path.join('test-results', dirs[0]);
  const files = fs.readdirSync(resultDir);
  const diffFile = files.find((f) => f.includes('diff'));

  if (!diffFile) {
    console.log('No diff image found in', resultDir);
    return;
  }

  console.log(`Found diff image: ${path.join(resultDir, diffFile)}`);
}

analyzeDiff();
