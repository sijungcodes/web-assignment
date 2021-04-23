<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Author;


class AuthorTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testAuthorControllerStatus()
    {
        $request = $this->call('GET', 'api/authors');
        $request->assertStatus(200);
    }

    public function testAuthorControllerAtStore()
    {
        $data = [
            'name' => "John Lock"
        ];

        $this->post(route('authors.store'), $data)
            ->assertStatus(200)
            ->assertJson($data);
    }

}
