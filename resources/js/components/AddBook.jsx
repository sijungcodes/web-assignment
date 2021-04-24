import React from 'react';
import Reflux from 'reflux';
import BookStore from '../stores/BookStore'
import BookActions from '../actions/BookActions'

class AddBook extends Reflux.Component {
    constructor(props) {
      super(props);
      this.state = {title: 'hi'};
      this.stores = [BookStore];
      this.storeKeys = ['books'];
      this.handleTitleChange = this.handleTitleChange.bind(this);
      this.handleAddBook = this.handleAddBook.bind(this);
    }
  
    handleTitleChange(e) {
        this.setState({title: e.target.value});
    }

    handleAddBook(e) {      
         e.preventDefault();
         BookActions.addBook(this.state.title);
    }
  
    render() {
      return (
        <div>
          <label>
            Title:
            <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
          </label>
          <button onClick={this.handleAddBook} >Add book</button>
        </div>
      );
    }
}

export default AddBook;