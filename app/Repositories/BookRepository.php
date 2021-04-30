<?php

namespace App\Repositories;

use App\Author;
use App\Book;
use Illuminate\Support\Facades\DB;

class BookRepository
{
    /**
     * Get books that match query.
     *
     * @param  String $query
     * @param  String $sort
     * @return Collection
     */
    public function queryTitle($q)
    {
        return Book::whereRaw(
                "MATCH(title) AGAINST(?)", 
                array($q))->with('authors')->get();
    }

    /**
     * Get books that match query.
     *
     * @param  String $query
     * @param  String $sort
     * @return Collection
     */
    public function queryBookByAuthorName($q)
    {
        return Book::whereHas('authors', function ($q) {
            $q->where('name', 'LIKE', TRIM('%q%'));
        })->with('authors')->get();
    }

    /**
     * Get all books sorted by title.
     *
     * @param  String $sort
     * @return Collection
     */
    public function getSortedByTitle($sort = 'asc')
    {
        return Book::with('authors')->orderBy('title', $sort)->get();
    }

    /**
     * Get all books sorted by title.
     *
     * @param  String $sort
     * @return Collection
     */
    public function getSortedByAuthorName($sort = 'asc')
    {
        return Book::join('author_book', 'author_book.book_id', '=', 'books.id')
        ->join('authors', 'authors.id', '=', 'author_book.author_id')
        ->orderBy('authors.name', $sort)->with('authors')->get();        
    }    

    /**
     * Create a new book record and link book to author.
     *
     * @param  String $bookTitle
     * @param  String $authorName
     * @return Book
     */
    public function storeAndLinkToAuthor($bookTitle, $authorName)
    {   
        $author = new Author;
        $author->name = $authorName; 
        $author->save();   

        $book = new Book;
        $book->title = $bookTitle; 
        $book->save();   
        
        $book->authors()->syncWithoutDetaching(
            $author->id
        );        

        return $book;
    }   

    /**
     * Link book to author.
     *
     * @param  Book $book
     * @param  Int $authorId
     * @return Array
     */
    public function linkToAuthor($book, $authorId)
    {    
        return $book->authors()->syncWithoutDetaching(
            $authorId
        );
    }             

    /**
     * Link book to author.
     *
     * @param  Int $bookId
     * @return Boolean
     */
    public function delete($bookId)
    {    
        $book = Book::find($bookId);
        $book->authors()->detach();
        return $book->delete();
    }     

}