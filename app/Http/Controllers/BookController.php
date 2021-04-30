<?php

namespace App\Http\Controllers;

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

    public function getBooksByTitle($sort = 'asc' , $query = null)
    {   
        if($query == null){
            //If no query is set, return all books sorted by title.
            return $this->books->getSortedByTitle($sort)->toJson(); 
        }else{
            //If query is set, return books that match query search.
            return $this->books->queryTitle($query)->toJson();
        }
    }

    public function getBooksByAuthor($sort = 'asc', $query = null)
    {   
        if($query == null){
            //If no query is set, return books sorted by author name.
            return $this->books->getSortedByAuthorName($sort)->toJson(); 
        }else{
            //If query is set, return books that match query search.
            return $this->books->queryBookByAuthorName($query)->toJson();
        }
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'author' => 'required'
        ]);
        $this->books->storeAndLinkToAuthor($validatedData['title'] , $validatedData['author']);

        return $this->books->getSortedByTitle('asc')->toJson();
    }

    public function delete(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required'
        ]);   
        $this->books->delete($validatedData['id']); 

        return $this->books->getSortedByTitle('asc')->toJson();
    }
}
