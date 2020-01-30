<?php

require_once './vendor/autoload.php';

use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;

class sights
{
    protected $database;
    protected $dbname = 'sights';

    public function __construct()
    {
        $acc = ServiceAccount::fromJsonFile(__DIR__ . './secret/kisvasutak-admin-8f710-firebase-adminsdk-wwrig-87938a4d8a.json');
        $firebase = (new Factory) -> withServiceAccount($acc) -> create();
        $this -> database = $firebase -> getDatabase();
    }

    public function getSights($userID = NULL) {
        /* if(empty($userID) ||!isset($userID)) {
            return false;
        } else { */
            if($this -> database -> getReference($this -> dbname)){
                return json_encode($this -> database -> getReference($this -> dbname) ->  getValue());
            }
            else {
                return FALSE;
            }
        //}
    }

    public function insertTrain(array $data) {

    }

}

$sights = new sights;
header('Content-type: application/json');
echo($sights -> getSights(""));