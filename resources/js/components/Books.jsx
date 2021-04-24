
import React from 'react';
import Reflux from 'reflux';
import Book from './Book';
import BookStore from '../stores/BookStore';
import BookActions from '../actions/BookActions';

class Books extends Reflux.Component {
    
    constructor(props) {
        super(props);
        this.stores = [BookStore];
        this.storeKeys = ['books'];
    }
    
    componentDidMount() {
    }
    
    render() {
        return (
            <div className="">
                {
                    this.state.books.map((book) => {
                        book.key = book.id;
                        return <Book {...book} />
                    })
                }
            </div>
           );
    }
    
};

export default Books;