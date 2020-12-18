<?php
include 'db.php';

class dbContext {
    private $dbAdapter;
    private $dbAccess;

    // DAL Initialization
    public function init($dbhost, $dbuser, $dbpass, $dbname) {
        $this->dbAccess = [ $dbhost, $dbuser, $dbpass, $dbname ];
        $this->dbAdapter = new DB($this->dbAccess);
    }

    // method for checking initialization result
    public function isInited() {
        return isset($this->dbAdapter);
    }

    /**
     * 
     * DataSets is started heare...
     * 
     */

    // EXAMPLES:

    public function dataset_Data() {
        return  DB::getRows("
SELECT
    id,
    text,
    created,
    important
FROM data
        ");
    }

    public function dataset_Totals() {
        return  DB::getRow("
SELECT
    COUNT(id),
    SUM(important),
    MAX(created)
FROM data
        ");
    }

    public function dataset_Item($id) {
        return  DB::getRow("
SELECT
    id,
    text,
    created,
    important
FROM data
WHERE id=?",
            [$id]
        );
    }
}
