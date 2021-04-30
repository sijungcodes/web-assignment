<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Books routes
Route::get('books/by-title/{sort?}/{query?}', 'BookController@getBooksByTitle');
Route::get('books/by-author/{sort?}/{query?}', 'BookController@getBooksByAuthor');
Route::post('books', 'BookController@store');
Route::delete('books', 'BookController@delete');

//Author routes
Route::post('authors', 'AuthorController@store');
Route::post('update-authors', 'AuthorController@update');
