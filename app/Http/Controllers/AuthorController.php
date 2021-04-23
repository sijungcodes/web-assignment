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
            'name' => $author->name,
        ]);
    }
}
