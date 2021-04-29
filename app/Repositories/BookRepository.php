<?php

namespace App\Repositories;

use App\book;
use App\Author;

class BookRepository
{
    /**
     * Get books that match query.
     *
     * @param  String $query
     * @param  String $sort
     * @return Collection
     */
    public function queryTitle($query, $sort = 'asc')
    {
        return $books = Book::whereRaw(
                "MATCH(title) AGAINST(?)", 
                array($query)
        )->with('authors')->orderBy('title', $sort)->get();
    }

    /**
     * Get all books.
     *
     * @param  String $sort
     * @return Collection
     */
    public function getSortedBy($sort = 'asc')
    {
        return Book::with('authors')->orderBy('title', $sort)->get();
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