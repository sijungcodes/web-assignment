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
    
}
