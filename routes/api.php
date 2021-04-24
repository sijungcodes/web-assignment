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
Route::get('books', 'BookController@index')->name('books.index');
Route::get('search-books/{query}', 'BookController@search')->name('books.search');
Route::post('books', 'BookController@store')->name('books.store');
Route::delete('books', 'BookController@delete')->name('books.delete');

//Author routes
Route::get('authors', 'AuthorController@index')->name('authors.index');
Route::get('search-authors/{query}', 'AuthorController@search')->name('authors.search');
Route::post('authors', 'AuthorController@store')->name('authors.store');
Route::post('update-authors', 'AuthorController@update')->name('authors.update');
