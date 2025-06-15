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
            'email_verified_at' => now(),
            'password' => Hash::make('1234'),
        ])->assignRole('Administrator');

        User::create([
            'full_name' => 'Stephen David Drouet Navarrete',
            'email' => 'david@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('1234'),
        ])->assignRole('Author');

        // Create 10 users
        // Crear 10 usuarios y actualizar su perfil con o sin foto
        User::factory(10)->create()->each(function ($user) {
            $hasPhoto = fake()->boolean(80); // 80% probabilidad de tener foto
            $user->password = Hash::make('1234'); // Set a default password
            $user->save();
            $user->profile->update([
                'photo' => $hasPhoto
                    ? 'https://randomuser.me/api/portraits/' .
                        (fake()->boolean() ? 'men/' : 'women/') .
                        fake()->numberBetween(0, 99) . '.jpg'
                    : null,
            ]);
        });

    }
}
