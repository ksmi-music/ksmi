#!/usr/bin/env node
/**
 * WordPress 테마 zip 패키징 스크립트
 *
 * 사용법: npm run build:wordpress
 * 결과: dist/ksmi-theme.zip
 */

import { execSync } from 'child_process';
import {
  copyFileSync,
  createWriteStream,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
} from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = join(__dirname, '..');
const themeName = 'ksmi';
const themeDir = join(rootDir, 'dist', themeName);
const distDir = join(rootDir, 'dist');

// 1. Vite 빌드 실행
console.log('📦 Vite 빌드 실행 중...');
execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });

// 2. 빌드 결과물 확인
const viteDistDir = join(rootDir, 'dist');
if (!existsSync(viteDistDir)) {
  console.error('❌ dist 폴더를 찾을 수 없습니다. 빌드가 실패했을 수 있습니다.');
  process.exit(1);
}

// 3. 테마 디렉토리 생성 및 정리
if (existsSync(themeDir)) {
  rmSync(themeDir, { recursive: true });
}
mkdirSync(themeDir, { recursive: true });

// 4. Vite 빌드 결과물을 테마 폴더로 복사 (themeDir 제외)
console.log('📋 빌드 결과물 복사 중...');
function copyRecursive(src, dest, excludeDir) {
  const entries = readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    if (excludeDir && entry.name === excludeDir) continue;
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    if (entry.isDirectory()) {
      mkdirSync(destPath, { recursive: true });
      copyRecursive(srcPath, destPath, excludeDir);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}
copyRecursive(viteDistDir, themeDir, themeName);

// 5. WordPress 테마 PHP 파일 복사
console.log('📄 WordPress 테마 파일 복사 중...');
const wpThemeDir = join(rootDir, 'wordpress-theme');
const wpFiles = ['style.css', 'index.php', 'functions.php'];
for (const file of wpFiles) {
  const src = join(wpThemeDir, file);
  const dest = join(themeDir, file);
  if (existsSync(src)) {
    copyFileSync(src, dest);
  }
}

// 6. favicon 복사
const faviconSrc = join(rootDir, 'public', 'favicon.ico');
const faviconDest = join(themeDir, 'favicon.ico');
if (existsSync(faviconSrc)) {
  copyFileSync(faviconSrc, faviconDest);
}

// 7. ZIP 파일 생성
const zipPath = join(rootDir, 'dist', `${themeName}-theme.zip`);
console.log('🗜️  ZIP 파일 생성 중...');

const output = createWriteStream(zipPath);
const archive = archiver('zip', { zlib: { level: 9 } });

await new Promise((resolve, reject) => {
  output.on('close', resolve);
  archive.on('error', reject);
  archive.pipe(output);
  archive.directory(themeDir, themeName);
  archive.finalize();
});

console.log(`\n✅ 완료! WordPress 테마 zip 파일: ${zipPath}`);
console.log(`   WordPress 관리자 > 테마 > 테마 추가 > zip 파일 업로드`);
