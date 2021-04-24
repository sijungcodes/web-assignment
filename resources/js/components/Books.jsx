
import React from 'react';
import Reflux from 'reflux';
import BookStore from '../stores/BookStore';
import BookActions from '../actions/BookActions';

class Books extends Reflux.Component {
    
    constructor(props) {
        super(props);
        this.stores = [BookStore];
        this.storeKeys = ['books'];
    }
    
    handleRemove(id){
        BookActions.removeBook(id);
    }
    
    render() {
        return (
            <div className="">
                {
                    this.state.books.map((book) => {
                        return <div key={book.id} >{book.title} 
                        <button onClick={this.handleRemove.bind(this, book.id)}>remove !</button>
                        <button>Add Author</button></div>
                    })
                }
            </div>
           );
    }
    
};

export default Books;