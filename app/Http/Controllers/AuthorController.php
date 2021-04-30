<?php

namespace App\Http\Controllers;

use App\Repositories\AuthorRepository;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    protected $authors;

    public function __construct(AuthorRepository $authors)
    {
        $this->authors = $authors;
    }

    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required',
            'name' => 'required'
        ]);
        
        return $this->authors->updateName($validatedData['id'],$validatedData['name'])->toJson();
    }
}
