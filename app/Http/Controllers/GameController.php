<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class GameController extends Controller
{
    public function index(Request $request)
    {

        $games = Game::with('location', 'users')->get();
        if($request['year']!=""){

            $games = Game::with('location', 'users')->where(DB::raw('YEAR(date)'), '=', $request['year'])->get();
        }
        return Inertia::render('Game/Index', [
            'games' => $games
        ]);
    }

}
