import React, { Component } from 'react'
import Reflux from 'reflux'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Books from './Books'

import BookStore from '../stores/Bookstore'
import BookActions from '../actions/BookActions'



class App extends Reflux.Component {

    constructor(props) {
        super(props);
        this.stores = [BookStore];
        this.storeKeys = ['getInitialBookData'];
    }

    handleClick() {
        BookActions.getInitialBookData();
    }

    render() {
        return ( <BrowserRouter >
            <div>
            <Header / >
            <button onClick = { this.handleClick } > get books < /button> 
             
            <Books / >
            </div>
            </BrowserRouter >
        )
    }
}

if (document.getElementById('app')) {
    ReactDOM.render( < App / > , document.getElementById('app'));
}