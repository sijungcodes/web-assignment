import React from 'react';
import Reflux from 'reflux';
import BookStore from '../stores/BookStore';
import BookActions from '../actions/BookActions';

class SearchBooks extends Reflux.Component {

    constructor(props) {
        super(props);
        this.state = {search: ''};
        this.stores = [BookStore];
        this.storeKeys = ['books'];
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchBooks = this.handleSearchBooks.bind(this);        
    }

    handleSearchChange(e) {
        this.setState({search: e.target.value});
    }

    handleSearchBooks(e) {      
        e.preventDefault();
        BookActions.searchBooks(this.state.search);
   }    

    render() {
        return (
          <div>
            <label>
              Search book by title:
              <input type="text" value={this.state.search} onChange={this.handleSearchChange} placeholder="search" />
            </label>
            <button onClick={this.handleSearchBooks} >Search</button>
          </div>
        );
      }
};

export default SearchBooks;    