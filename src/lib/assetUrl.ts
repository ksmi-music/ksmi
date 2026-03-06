/**
 * 정적 에셋(이미지 등) URL 반환
 */
export function assetUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return normalizedPath;
}
