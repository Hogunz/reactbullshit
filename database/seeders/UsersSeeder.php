<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $adminUser = User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin'),
        ]);
        $writer = User::create([
            'name' => 'writer',
            'email' => 'writer@gmail.com',
            'password' => Hash::make('writer'),
        ]);

        Role::create(['name' => 'writer']);
        $writer->assignRole('writer');

        Role::create(['name' => 'admin']);
        $adminUser->assignRole('admin');
    }
}
