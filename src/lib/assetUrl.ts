/**
 * 정적 에셋(이미지 등) URL 반환
 * WordPress 테마로 배포 시 window.__THEME_URI__가 주입되며, 그렇지 않으면 루트 경로 사용
 */
declare global {
  interface Window {
    __THEME_URI__?: string;
  }
}

export function assetUrl(path: string): string {
  const base = typeof window !== 'undefined' && window.__THEME_URI__ ? window.__THEME_URI__ : '';
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return base + normalizedPath;
}
