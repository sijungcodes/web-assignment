<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {   
        $books = DB::table('books', 'desc')->take(50)->get();
        return $books->toJson();
    }
    
}
