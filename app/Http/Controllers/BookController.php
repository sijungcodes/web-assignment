<?php

namespace App\Http\Controllers;

use App\Book;
use App\Repositories\BookRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class BookController extends Controller
{
    protected $books;

    public function __construct(BookRepository $books)
    {
        $this->books = $books;
    }

    public function getBooks($sort = 'asc', $queryType = 'title', $query = null)
    {   
        if($query == null){
            //If no query is set, return all books.
            return $this->books->getSortedBy($sort)->toJson(); 
        }else{
            //If query is set, return books that match query search.
            return $this->books->queryTitle($query, $sort)->toJson();
        }
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'author' => 'required'
        ]);
        $this->books->storeAndLinkToAuthor($validatedData['title'] , $validatedData['author']);

        return $this->books->getSortedBy('asc')->toJson();
    }

    public function delete(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required'
        ]);   
        $this->books->delete($validatedData['id']); 

        return $this->books->getSortedBy('asc')->toJson();
    }
}
