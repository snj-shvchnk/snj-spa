<?php
// Maping of HTTP requests in an Application
class Router
{
    // Available routes stored heare
    private static $routes = array();
   
    // prevent dublicates
    private function __construct() {}
    private function __clone() {}
   
    public static function route($pattern, $callback)
    {
        // need use str_replace for slashes escaping
        $pattern = '/^' . str_replace('/', '\/', $pattern) . '$/';
        self::$routes[$pattern] = $callback;
    }
   
    // Url processing, target method calling
    public static function execute($url)
    {
        $url = '/'.trim( strtolower( trim($url) ) ,'/');
        foreach (self::$routes as $pattern => $callback)
        {
            // Url-to-route comparation
            if (preg_match($pattern, $url, $params))
            {
                // suggestions finded,
                // remove first part of url and continue processing
                array_shift($params);
                return call_user_func_array($callback, array_values($params));
            }
        }
    }
}



//  // Homepage without URL
//  Router::route('/', function(){
//     print 'Home page';
//   });
  
//   // Inner pages like google.com/blog/cats/12091983
//   Router::route('blog/(\w+)/(\d+)', function($category, $id){
//     print $category . ':' . $id;
//   });
  
//   // Run router on script execution
//   Router::execute($_SERVER['REQUEST_URI']);