<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Location;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class GameController extends Controller
{
    public function index(Request $request)
    {

       // $games = Game::with('location', 'users')->get();
        $year = $request['year'] != "" ? $request['year'] : date("Y");
        $games = Game::with('location', 'users')->where(DB::raw('YEAR(date)'), '=', $year)->get();

        return Inertia::render('Game/Index', [
            'games' => $games
        ]);
    }

    public function store(Request $request)
    {
        $gems1 = $request['g1'] ? $request['g1'] : 0;
        $gems2 = $request['g2'] ? $request['g2'] : 0;
        $winner = $gems1>$gems2 ? $request['p1']['value'] : $request['p2']['value'];
        if($gems1==$gems2 ) $winner = 0;

        $game = Game::create([
            'date' => $request['date'],
            'winner' =>$winner,
            'location_id' => $request['location']['value']
        ]);
        $game->users()->attach([
            $request['p1']['value']=> ['gems' => $gems1],
            $request['p2']['value']=> ['gems' => $gems2]
        ]);
        $game->save();

        return Redirect::route('games.index');
    }

    public function create()
    {
        $users = User::role('user')->get();
        $locations = Location::all();
        return Inertia::render('Game/Create', [
            'igraci' => $users,
            'lokacije' => $locations
        ]);
    }

    public function edit(Game $game)
    {
        $users = User::role('user')->get();
        $locations = Location::all();
        return Inertia::render('Game/Edit', [
            'igraci' => $users,
            'lokacije' => $locations,
            'game' => Game::with('location', 'users')->where('id', '=', $game->id)->get()
        ]);
    }

    public function update(Request $request, Game $game)
    {
       // dd($request);
        $gems1 = $request['g1'] ? $request['g1'] : 0;
        $gems2 = $request['g2'] ? $request['g2'] : 0;
        $winner = $gems1>$gems2 ? $request['p1'] : $request['p2'];
        if($gems1==$gems2 ) $winner = 0;
        $game->date = $request['date'];
        $game->winner = $winner;
        $game->location_id = $request['location'];
        $game->users()->sync([
            $request['p1']=> ['gems' => $gems1],
            $request['p2']=> ['gems' => $gems2]
        ]);

        $game->save();

        return Redirect::route('games.index')->with('success', 'Successfully updated');

    }

}
