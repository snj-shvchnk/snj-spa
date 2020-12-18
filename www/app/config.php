<?php 
// Snj: Main Back-end configuration is stored heare
//      specific values for local development will be overiden in local.config.php
//      heare is production setttings only (of for both configuration)
return array(
    // DEV settings
    'dev_debug' => false,

    // DB access:
    // production SQL host (can be 'localhost' or '127.0.0.1')
    'db_host' => 'mysql.hostname.com', 

    // production SQL credentials
    'db_user' => 'prod_mysql_usr',
    'db_pass' => '111',
    'db_name' => 'prod_database_1',

    // Front settings:
    'api_base_url' => '/api/',
    'front_wrapper' => '/build/index.html',

    // Site settings:
    'site_title' => 'Snj SPA boX',
    'site_icon' => 'browser.ico',
    // 
    // ...
    // other settings
    // 'color_scheme' => 'light', // light|dark|soft
);