<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $with =[ 'location'];

    public function users(){
        return $this->belongsToMany(User::class)->withPivot('gems')->withTimestamps();
    }
    public function location(){
        return $this->belongsTo(Location::class);
    }
}
