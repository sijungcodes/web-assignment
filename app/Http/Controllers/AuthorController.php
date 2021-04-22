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

}
