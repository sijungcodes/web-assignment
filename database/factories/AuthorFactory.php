<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Author;
use Faker\Generator as Faker;

//Use Faker's catchPrase method to simulate book titles in testing or seeding.
$factory->define(Author::class, function (Faker $faker) {
    return [
        'name' => $this->faker->name,
    ];
});
