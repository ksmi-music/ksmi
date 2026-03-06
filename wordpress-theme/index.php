<?php
/**
 * KSMI 테마 메인 템플릿
 * React SPA 앱을 로드합니다.
 *
 * @package KSMI
 */

$theme_dir = get_template_directory();
$theme_uri = get_template_directory_uri();
$index_path = $theme_dir . '/index.html';

if (!file_exists($index_path)) {
    wp_die('테마 빌드 파일을 찾을 수 없습니다. "npm run build:wordpress" 명령을 실행해주세요.');
}

$html = file_get_contents($index_path);

// WordPress 테마 URL을 JS에서 사용할 수 있도록 주입
$theme_uri_js = esc_js($theme_uri);
$inject_script = "<script>window.__THEME_URI__='{$theme_uri_js}';</script>";
$html = str_replace('<head>', '<head>' . $inject_script, $html);

// 절대 경로를 WordPress 테마 URL로 변환
$html = str_replace('href="/assets/', 'href="' . esc_url($theme_uri) . '/assets/', $html);
$html = str_replace('src="/assets/', 'src="' . esc_url($theme_uri) . '/assets/', $html);
$html = str_replace('href="/favicon.ico"', 'href="' . esc_url($theme_uri) . '/favicon.ico"', $html);

// WordPress head/footer 훅 삽입 (플러그인 호환)
$head_pos = strpos($html, '</head>');
$body_pos = strpos($html, '</body>');

if ($head_pos !== false && $body_pos !== false) {
    echo substr($html, 0, $head_pos);
    wp_head();
    echo substr($html, $head_pos, $body_pos - $head_pos);
    wp_footer();
    echo substr($html, $body_pos);
} else {
    echo $html;
}
