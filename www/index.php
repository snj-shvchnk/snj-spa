<?php 
// Snj: Main App endpoint
// phpinfo();die();
define("_ROOT_", __DIR__);
include_once 'app/app.php';
include_once 'app/backtools.php';

// Snj: read config settings to global variable
$_config = include_once('app/config.php');
// BackTools::dev_dump($_config, false);
// If no configuration - do nothink
if (empty($_config)) {
    BackTools::DieHTTP500('Configuration reading filed');
}

// Snj: apply specific lacale ettings
$local_confif_file = 'app/local.config.php';
// add local.cpnfig, if exists
if (file_exists($local_confif_file)) {
    // echo "Local config: $local_confif_file"; 
    $_local_config = include_once($local_confif_file);
    // BackTools::dev_dump($_local_config, false);
    $_config = array_merge($_config, $_local_config);
}
// Check configuration heare:
// BackTools::dev_dump($_config, true);

// Manage logging:
// show errors only in Debug mode
if ($_config['dev_debug']) {
    ini_set('display_errors', 1); 
    error_reporting(E_ALL);
} else {
    ini_set('display_errors', 0); 
    error_reporting(0);
}



// Snj: initialization of an App instance
$_app = new App();
$initError = $_app->init($_config);

// Try to init App, do nothink if errors
if (isset($initError)) {
    BackTools::dev_dump($initError, true);
    BackTools::DieHTTP500('App initialization filed');
}

try {

    // Execute App-controller actions:
    $_app->run();

} catch (Exception $e) { 
    BackTools::DieHTTP500($e->getMessage()); 
}