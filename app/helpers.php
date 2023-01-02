<?php

use App\Models\Location;
use App\Models\User;

 function getLocationByName($name){
    return Location::where('name', $name)->first()->id;
}

 function getUserByName($name){
    return User::where('name', $name)->first()->id;
}


