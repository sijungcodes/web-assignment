<?php

namespace App\Http\Controllers;

use App\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {   
        $books = Book::orderBy('id', 'desc')->take(50)->get();
        return $books->toJson();
    }

    public function store(Request $request)
    {
        //If request validation fails, an exception will be thrown.
        $validatedData = $request->validate([
            'title' => 'required'
        ]);

        $book = new Book;
        $book->title = $validatedData['title'];
        $book->save();

        return response()->json([
            'title' => $book->title,
        ]);
    }
}
