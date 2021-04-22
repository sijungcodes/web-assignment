<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Book;
use Faker\Generator as Faker;

//Use Faker's catchPrase method to simulate book titles in testing or seeding.
$factory->define(Book::class, function (Faker $faker) {
    return [
        'title' => $this->faker->catchPhrase,
    ];
});
