<?
// Snj:
//      Local enviropment configuration (will overide values from config.php)
//      Do not copy it to prod (excluded from production build script)
return array(
    // DEV settings
    'dev_debug' => true,
    
    // local Docker SQL Server connections
    'db_host' => '172.19.0.4', // specifed in docker-compose.yml
    'db_user' => 'dev_sql_usr',
    'db_pass' => '111',
    'db_name' => 'dev_database_1'
);

