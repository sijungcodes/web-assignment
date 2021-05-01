<?php

use Illuminate\Database\Seeder;

class AuthorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Seed author table with author name for testing.
        $authors = factory(App\Author::class, 5)->create();  
    }
}
