<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $authors = factory(App\Author::class, 10)->create();
        $books = factory(App\Book::class, 100)->create();
        $books->each(function (App\Book $book) use ($authors) {
            $book->authors()->syncWithoutDetaching(
                $authors->random(rand(1, 3))->pluck('id')->toArray()
            );
        });      
    }
}
