<?php
/**
 * Process client API data requests
 */
class ApiController {
    public function init( $dbContext ) {
        // API has instance of DAL connector
        $this->DBC = $dbContext;
    }

    /**
     * Main API input point.
     * Take 3 optional parametrs.
     */
    public function process($model, $data1, $data2) {
        // IsAutorized()?
        // IsHasAccess()?

        switch ($model) {

            case "dashboard":  
                $this->processDashboard($data1, $data2);  
                break;

            // Other routes:
            // ...
            // case "my_route": ...

            default: BackTools::DieHTTP500('API route not found.');
        }
    }

    /**
     * !EXEMPLE!
     * Get some data from DB and send to client as JSON
     */
    public function processDashboard($type, $id) {
        $responce = array();
        switch ($type) {

            case 'data': 
                $responce['data'] = $this->DBC->dataset_Data();
                $responce['totals'] = $this->DBC->dataset_Totals();
                $this->JSONResponce($responce);
                break;

            case 'item': 
                $responce['item'] = $this->DBC->dataset_Item($id);
                $this->JSONResponce($responce);
                break;

            default: break;
        }
    }


    /**
     * Convert data to JSON and send as responce (for client Ajax handlers)
     */
    private function JSONResponce($data) {
        $json_responce = json_encode($data);
        echo $json_responce;
        die();
    }
}