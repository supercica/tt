<?php

namespace Database\Seeders;

use App\Models\Game;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $games = [
            ['date' =>'2022-01-31','winner'=>'Sasa','location'=>'TK Sa&Ni','p1'=>'Dejan', 'p2'=>'Sasa', 'g1'=>5, 'g2'=>8 ],
            ['date' =>'2022-02-12','winner'=>'Sasa','location'=>'TK Sa&Ni','p1'=>'Dejan', 'p2'=>'Sasa', 'g1'=>6, 'g2'=>7],
            ['date' =>'2022-05-28','winner'=>'Sasa','location'=>'TK Aradinovic','p1'=>'Dejan', 'p2'=>'Sasa', 'g1'=>5, 'g2'=>8],
            ['date' =>'2022-07-09','winner'=>'Sasa','location'=>'TK Aradinovic','p1'=>'Dejan', 'p2'=>'Sasa', 'g1'=>6, 'g2'=>8],
            ['date' =>'2022-08-06','winner'=>'Sasa','location'=>'TK Aradinovic','p1'=>'Dejan', 'p2'=>'Sasa', 'g1'=>4, 'g2'=>8],
            ['date' =>'2022-09-28','winner'=>'Sasa','location'=>'Olimp','p1'=>'Dejan', 'p2'=>'Sasa', 'g1'=>4, 'g2'=>8],
            ['date' =>'2022-09-30','winner'=>'Sasa','location'=>'TK Aradinovic','p1'=>'Dejan', 'p2'=>'Sasa', 'g1'=>6, 'g2'=>7],
            ['date' =>'2022-10-08','winner'=>'Dejan','location'=>'TK Aradinovic','p1'=>'Dejan', 'p2'=>'Sasa', 'g1'=>8, 'g2'=>5],
            ['date' =>'2022-10-23','winner'=>'Dejan','location'=>'TK Aradinovic','p1'=>'Dejan', 'p2'=>'Sasa', 'g1'=>12, 'g2'=>1],

            ['date' =>'2022-01-02','winner'=>'Nikola','location'=>'TK Sa&Ni','p1'=>'Dejan', 'p2'=>'Nikola', 'g1'=>2, 'g2'=>8],
            ['date' =>'2022-04-26','winner'=>'Nikola','location'=>'TK Slice','p1'=>'Dejan', 'p2'=>'Nikola', 'g1'=>6, 'g2'=>9],
            ['date' =>'2022-05-01','winner'=>'Nikola','location'=>'TK Metalac','p1'=>'Dejan', 'p2'=>'Nikola', 'g1'=>4, 'g2'=>6],
            ['date' =>'2022-06-09','winner'=>'Dejan','location'=>'TK Metalac','p1'=>'Dejan', 'p2'=>'Nikola', 'g1'=>7, 'g2'=>5],
            ['date' =>'2022-07-03','winner'=>'Nikola','location'=>'TK Metalac','p1'=>'Dejan', 'p2'=>'Nikola', 'g1'=>3, 'g2'=>9],
            ['date' =>'2022-08-26','winner'=>'Nikola','location'=>'TK Metalac','p1'=>'Dejan', 'p2'=>'Nikola', 'g1'=>2, 'g2'=>6],
            ['date' =>'2022-10-08','winner'=>'Nikola','location'=>'TK Aradinovic','p1'=>'Dejan', 'p2'=>'Nikola', 'g1'=>0, 'g2'=>6],
            ['date' =>'2022-10-30','winner'=>'Nikola','location'=>'TK Metalac','p1'=>'Dejan', 'p2'=>'Nikola', 'g1'=>6, 'g2'=>9],
            ['date' =>'2022-11-08','winner'=>'Nikola','location'=>'TK Twins','p1'=>'Dejan', 'p2'=>'Nikola', 'g1'=>3, 'g2'=>9],

            ['date' =>'2022-02-12','winner'=>'Sasa','location'=>'TK Sa&Ni','p1'=>'Nikola', 'p2'=>'Sasa', 'g1'=>4, 'g2'=>6],
            ['date' =>'2022-05-28','winner'=>'Nikola','location'=>'TK Aradinovic','p1'=>'Nikola', 'p2'=>'Sasa', 'g1'=>6, 'g2'=>0],
            ['date' =>'2022-08-19','winner'=>'Nikola','location'=>'Olimp','p1'=>'Nikola', 'p2'=>'Sasa', 'g1'=>7, 'g2'=>6],
            ['date' =>'2022-10-08','winner'=>'Sasa','location'=>'TK Aradinovic','p1'=>'Nikola', 'p2'=>'Sasa', 'g1'=>6, 'g2'=>9],
        ];

        foreach($games as $one){
            $game = Game::create(
                [
                    'date' => Carbon::parse($one['date']),
                    'winner' => getUserByName($one['winner']),
                    'location_id' => getLocationByName($one['location'])
                ]
            );
            $game->users()->attach(getUserByName($one['p1']), ['gems' => $one['g1']]);
            $game->save();
            $game->users()->attach(getUserByName($one['p2']), ['gems' => $one['g2']]);
            $game->save();

        }

    }

}
