<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Book;

class BookTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function testBookControllerStatus()
    {
        $response = $this->call('GET', 'api/books');
        $response->assertStatus(200);
    }

    public function testBookControllerAtStore()
    {
        $data = [
            'title' => "my book title"
        ];

        $this->post(route('books.store'), $data)
            ->assertStatus(200)
            ->assertJson($data);
    }

    public function testBookControllerAtDelete()
    {
        $book = factory(Book::class)->create();
        $response = $this->delete(route('books.delete', $book->id));
        $response->assertStatus(200);
    }

    public function testBookControllerAtSearch()
    {
        $request = $this->get(route('books.search', 'book'));
        $request->assertStatus(200);

    }

}
