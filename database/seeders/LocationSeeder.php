<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $location = Location::create(['name' => 'TK Sa&Ni', 'address' => '', 'lat' => '', 'long' => '']);
        $location = Location::create(['name' => 'TK Aradinovic', 'address' => '', 'lat' => '', 'long' => '']);
        $location = Location::create(['name' => 'Olimp', 'address' => '', 'lat' => '', 'long' => '']);
        $location = Location::create(['name' => 'TK Slice', 'address' => '', 'lat' => '', 'long' => '']);
        $location = Location::create(['name' => 'TK Metalac', 'address' => '', 'lat' => '', 'long' => '']);
        $location = Location::create(['name' => 'TK Twins', 'address' => '', 'lat' => '', 'long' => '']);
    }
}
