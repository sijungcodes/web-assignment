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

    public function testAuthorControllerAtUpdate()
    {

        //Step 1. Create data for author and save said data
        $data = [
            'name' => "William Shake"
        ];        

        $savedAuthorResponse = json_decode($this->post(route('authors.store'), $data)->getContent(), true);


        //Step 2. Update data of author created in step 1  
        $updatedData = [
            'author_id' => $savedAuthorResponse['author_id'],
            'name' => "William Shakespeare"
        ];

        $updatedAuthorResponse = json_decode($this->post(route('authors.update'), $updatedData)->getContent(), true);

        $isUpdated = false;
        if( $savedAuthorResponse['name'] != $updatedAuthorResponse['name']){
            $isUpdated = true;
        }

        $this->assertTrue($isUpdated);

    }    
}
