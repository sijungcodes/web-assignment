<?php

namespace App\Http\Controllers;

use App\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {   
        $books = Book::orderBy('id', 'desc')->take(500)->get();
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

        $books = Book::orderBy('id', 'desc')->take(500)->get();
        return $books->toJson();
    }

    public function delete(Request $request) {

        $validatedData = $request->validate([
            'id' => 'required'
        ]);    

        $bookId = $validatedData['id'];

        $book = Book::find($bookId);
        $bookToBeDeletedTitle = $book->title;
        $book->delete();

        $books = Book::orderBy('id', 'desc')->take(500)->get();
        return $books->toJson();
    }

    public function search($query){
	 
        $books = Book::whereRaw(
                "MATCH(title) AGAINST(? IN NATURAL LANGUAGE MODE)", 
                array($query)
        )->get();

        return $books->toJson();   
    }
}
