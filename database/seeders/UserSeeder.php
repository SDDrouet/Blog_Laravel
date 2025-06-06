<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'full_name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('12345678'),
        ]);

        User::create([
            'full_name' => 'Stephen Drouet',
            'email' => 'stephen.drouet@example.com',
            'password' => Hash::make('12345678'),
        ]);

        // Create 10 users

        User::factory(10)->create();
    }
}
