import React, { Component } from 'react'
import Reflux from 'reflux'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Books from './Books'
import SearchBooks from './SearchBooks'
import AddBook from './AddBook'
import BookStore from '../stores/BookStore'
import BookActions from '../actions/BookActions'



class App extends Reflux.Component {

    constructor(props) {
        super(props);
        this.stores = [BookStore];
        this.storeKeys = ['books'];
    }

    componentDidMount() {
        BookActions.getInitialBookData();
    }    

    render() {
        return ( <BrowserRouter >
            <div>
                <Header / >
                <AddBook />
                <SearchBooks />
                <Books / >
            </div>
            </BrowserRouter >
        )
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(  < App / > , document.getElementById('app'));
}