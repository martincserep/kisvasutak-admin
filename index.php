<?php
require_once './vendor/autoload.php';

use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;

$serviceAccount = ServiceAccount::fromJsonFile('./secret/kisvasutak-admin-8f710-firebase-adminsdk-wwrig-87938a4d8a.json');

$firebase = (new Factory)
    ->withServiceAccount($serviceAccount)
    ->create();

$database = $firebase->getDatabase();


require_once "router.php";

route('api/trains', function () {
    return "./trains.php";
});

route('api/accomodations', function () {
    return "./accomodations.php";
});

route('sights', function () {
    return include_once "./sights.php";
});

$action = $_SERVER['REQUEST_URI'];
dispatch($action);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Kisvasutak - Admin</title>
</head>
<body>
    
</body>
</html>