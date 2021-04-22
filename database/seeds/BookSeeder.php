<?php

use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Seed book table with book titles for testing.
        $books = factory(App\Book::class, 10)->create();      
    }
}
