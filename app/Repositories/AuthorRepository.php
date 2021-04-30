<?php

namespace App\Repositories;

use App\Author;
use App\Book;

class AuthorRepository
{
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
}