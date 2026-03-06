#!/usr/bin/env node
/**
 * GitHub Pages SPA 라우팅: 404.html을 index.html과 동일하게 생성
 * 사용자가 /about 등 직접 URL 접근 시 index.html이 로드되도록 함
 */
import { copyFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const indexPath = join(distDir, 'index.html');
const notFoundPath = join(distDir, '404.html');

if (!existsSync(indexPath)) {
  console.error('❌ dist/index.html을 찾을 수 없습니다. 먼저 npm run build를 실행하세요.');
  process.exit(1);
}

copyFileSync(indexPath, notFoundPath);
console.log('✅ dist/404.html 생성 완료 (SPA 라우팅용)');
