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

        $body = [
            [
                "type" => "paragraph",
                "children" => [
                    ["text" => $this->faker->sentence()],
                    ["text" => $this->faker->word(), "bold" => true],
                    ["text" => " " . $this->faker->words(3, true)],
                    ["text" => $this->faker->word(), "italic" => true],
                    ["text" => " " . $this->faker->sentence()],
                    ["text" => $this->faker->word(), "code" => true],
                    ["text" => "."],
                ],
            ],
            [
                "type" => "paragraph",
                "children" => [
                    ["text" => "Puedes utilizar teclas como Ctrl+B para "],
                    ["text" => "activar negrita", "bold" => true],
                    ["text" => ", o escribir bloques como citas."],
                ],
            ],
            [
                "type" => "block-quote",
                "children" => [
                    ["text" => $this->faker->sentence()],
                ],
            ],
            [
                "type" => "paragraph",
                "align" => "center",
                "children" => [
                    ["text" => $this->faker->sentence()],
                ],
            ],
        ];
        
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'introduction' => $this->faker->realText(255),
            'image' => 'https://placehold.co/640x480?text=' . urlencode($this->faker->word),
            'body' => $body,
            'status' => $this->faker->boolean(),
            'user_id' => User::all()->random()->id,
            'category_id' => Category::all()->random()->id,
        ];
    }
}
