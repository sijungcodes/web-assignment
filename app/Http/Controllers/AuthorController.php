<?php

namespace App\Http\Controllers;

use App\Author;
use App\Repositories\AuthorRepository;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    protected $authors;

    public function __construct(BookRepository $authors)
    {
        $this->authors = $authors;
    }

    public function getAuthors($sort = 'asc', $query = null)
    {   
        if($query == null){
            //If no query is set, return all authors.
            return $this->authors->getSortedByName($sort)->toJson(); 
        }else{
            //If query is set, return authors that match query search.
            return $this->authors->queryByName($query, $sort)->toJson();
        }
    }

    public function update(Request $request)
    {
        //If request validation fails, an exception will be thrown.
        $validatedData = $request->validate([
            'id' => 'required',
            'name' => 'required'
        ]);

        return $authors->updateName($validatedData['id'],$validatedData['name'])->toJson();
    }
}
