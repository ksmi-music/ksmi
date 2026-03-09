import { Helmet } from "react-helmet-async";

const SITE_URL = "https://music-informatics.kr";
const DEFAULT_IMAGE = `${SITE_URL}/logo_ksmi.webp`;

interface SeoHeadProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function SeoHead({
  title = "한국음악정보학회 - KSMI | Korean Society for Music Informatics",
  description = "한국음악정보학회(Korean Society for Music Informatics, KSMI) 공식 홈페이지. 음악정보학 관련 학술대회, 연구, 학회 소개.",
  path = "/",
  image = DEFAULT_IMAGE,
  noIndex = false,
}: SeoHeadProps) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = path === "/" ? title : `${title} | 한국음악정보학회`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={url} />

      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
