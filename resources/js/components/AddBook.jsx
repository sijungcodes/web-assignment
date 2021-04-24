import React from 'react';
import Reflux from 'reflux';
import BookStore from '../stores/Bookstore'
import BookActions from '../actions/BookActions'

class AddBook extends Reflux.Component {
    constructor(props) {
      super(props);
      this.state = {title: 'hi'};
      this.stores = [BookStore];
      this.storeKeys = ['books'];
      this.handleTitleChange = this.handleTitleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleTitleChange(e) {
      this.setState({title: e.target.value});
    }

    handleSubmit(e) {
      alert('A book was submitted: ' + this.state.title);
      BookActions.addBook(this.state.title);
      e.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
}

export default AddBook;