<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

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


}
