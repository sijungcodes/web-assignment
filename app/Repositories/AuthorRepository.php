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
        return Author::query()->where('name', 'LIKE', "%{$searchTerm}%")->with('books')->orderBy('name', $sort)->get();
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
        $author = Author::find($authorId);
        $author->name = $authorName;
        $author->save();
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