<?php
/**
 * KSMI 테마 Functions
 *
 * @package KSMI
 */

// 모든 프론트엔드 요청에 SPA 템플릿 사용 (관리자, AJAX 제외)
add_filter('template_include', function($template) {
    if (is_admin() || wp_doing_ajax() || wp_doing_cron()) {
        return $template;
    }
    return get_template_directory() . '/index.php';
}, 99);
