<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Category;
use App\Models\Comment;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Call the UserSeeder to seed the users table
        $this->call([
            UserSeeder::class,
            // Add other seeders here as needed
        ]);

        // Factories
        Category::factory(10)->create();
        Article::factory(20)->create();
        Comment::factory(20)->create();
    }
}
