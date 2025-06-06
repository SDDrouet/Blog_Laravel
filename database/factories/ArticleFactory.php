<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->unique()->realText(55);
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'introduction' => $this->faker->realText(255),
            'image' => 'https://placehold.co/640x480?text=' . urlencode($this->faker->word),
            'body' => $this->faker->realText(2000),
            'status' => $this->faker->boolean(),
            'user_id' => User::all()->random()->id,
            'category_id' => Category::all()->random()->id,
        ];
    }
}
