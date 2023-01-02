<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Game;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('User/Index', [
            'users' => UserResource::collection(User::all()),
            'games' => Game::count()
        ]);
    }

    public function show(User $user)
    {
        $games = Game::all();
        $data = $games->filter(function ($game) use ($user) {
            $ids = $game->users->pluck('id')->toArray();
            if (in_array($user->id, $ids)) {
                return [$game];
            }
        })->values();
        $games = $data->map(function($game) use ($user){
                return [
                    'id' => $game->id,
                    'date' => $game->date,
                    'winner' => $game->winner,
                    'location' => $game->location,
                    'users' => $game->users->map(function ($user) {
                        return [
                            'id' => $user->id,
                            'name' => $user->name,
                            'gems' => $user->pivot->gems
                        ];
                    })
                ];
        });
        return Inertia::render('User/Show', [
            'user' => $user,
            // 'games' => Game::with('users')->whereHas("user_id", $user->id)->get(),
            'games' => $games
        ]);

    }
}
