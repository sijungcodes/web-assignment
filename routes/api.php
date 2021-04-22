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

Route::get('books', 'BookController@index')->name('books.index');
Route::post('books', 'BookController@store')->name('books.store');
Route::delete('books/{id}', 'BookController@delete')->name('books.delete');
