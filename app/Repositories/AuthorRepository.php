<?php

namespace App\Repositories;

use App\Author;

class BookRepository
{
    /**
     * Get author that match query.
     *
     * @param  String $query
     * @param  String $sort
     * @return Collection
     */
    public function queryByName($query, $sort = 'asc')
    {
        return $authors = Author::whereRaw(
                "MATCH(title) AGAINST(?)", 
                array($query)
        )->with('books')->orderBy('name', $sort)->get();
    }

    /**
     * Get all authors.
     *
     * @param  String $sort
     * @return Collection
     */
    public function getSortedByName($sort = 'asc')
    {
        return Author::with('books')->orderBy('name', $sort)->get();
    }

    /**
     * Update author name.
     *
     * @param  Int $authorId
     * @param  String $authorName
     * @return Author
     */
    public function updateName($authorId, $authorName)
    {   

        return $author;
    }   

    /**
     * Link author to book.
     *
     * @param  Book $author
     * @param  Int $bookId
     * @return Array
     */
    public function linkToBook($author, $bookId)
    {    
        return $author->books()->syncWithoutDetaching(
            $bookId
        );
    }             
   

}