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
    public function testBookControllerStatus()
    {
        $request = $this->call('GET', 'api/authors');
        $request->assertStatus(200);
    }
}
