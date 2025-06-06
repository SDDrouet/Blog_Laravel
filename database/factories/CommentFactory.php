<?php

namespace Database\Factories;

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        //generate value(number 1-5), description, user_id, article_id
        return [
            'value' => $this->faker->numberBetween(1, 5),
            'description' => $this->faker->realText(200),
            'user_id' => User::all()->random()->id,
            'article_id' => Article::all()->random()->id,
        ];
    }
}
