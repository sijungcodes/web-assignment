<?php

namespace App\Http\Controllers;

use App\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function index()
    {   
        $authors = Author::orderBy('id', 'desc')->take(500)->get();
        return $authors->toJson();
    }

    public function store(Request $request)
    {
        //If request validation fails, an exception will be thrown.
        $validatedData = $request->validate([
            'name' => 'required'
        ]);

        $author = new Author;
        $author->name = $validatedData['name'];
        $author->save();

        return response()->json([
            'author_id' => $author-> id,
            'name' => $author->name,
        ]);
    }

    public function update(Request $request)
    {
        //If request validation fails, an exception will be thrown.
        $validatedData = $request->validate([
            'author_id' => 'required',
            'name' => 'required'
        ]);

        $author = Author::find($validatedData['author_id']);
        $author->name = $validatedData['name'];
        $author->save();

        return response()->json([
            'author_id' => $author-> id,
            'name' => $author->name,
        ]);
    }

    public function search($query){
	 
        $authors = Author::whereRaw(
                "MATCH(title) AGAINST(? IN NATURAL LANGUAGE MODE)", 
                array($query)
        )->get();

        return $author->toJson();   
    }    

}
