<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role = Role::create(['name' => 'admin']);
        $role = Role::create(['name' => 'user']);
        $user = User::create([
            'name' => 'Jelena Popovic',
            'email' => 'jejazz@gmail.com',
            'nickname' => 'jejazz',
            'password' => Hash::make('123Brate#'),
        ]);

        $user->assignRole('admin');

        $users = ['Nikola', 'Dejan', 'Sasa'];
        foreach ($users as $one){
            $user = User::create([
                'name' => $one,
                'email' => strtolower($one).'@test.com',
                'nickname' => strtolower($one),
                'password' => Hash::make('123'.$one.'#')
            ]);
            $user->assignRole('user');
        }

    }
}
