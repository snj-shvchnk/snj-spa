<?php

class BackTools {
    /**
     * Retirn server error (display message if DEBUG mode in config is true)
     */
    public static function DieHTTP500 ($message) {
        global $_config;
        $message = 
            (empty($message) OR empty($_config) OR empty($_config['dev_debug']))
                ? 'Internal server error'
                : $message;

        header($_SERVER['SERVER_PROTOCOL'] . ' 500 ' . $message . '.', true, 500);
        die();
    }

    /**
     * Sjn: debug pretify-print wrapper
     */
    public static function dev_dump($var, $die=false) {
        echo '<pre>';
        var_dump($var);
        echo '</pre>';
        if ($die) die();
    }
}