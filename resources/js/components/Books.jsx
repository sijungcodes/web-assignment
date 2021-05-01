
import React from 'react';
import Reflux from 'reflux';
import BookStore from '../stores/BookStore';
import Book from './Book';
import DownloadBar from './DownloadBar'

class Books extends Reflux.Component {
    
    constructor(props) {
        super(props);
        this.stores = [BookStore];
        this.storeKeys = ['books'];
    }
    
    render() {
        console.log("render");
        return (
            <div className="">
                <div className="tr pv3">
                    <DownloadBar />
                </div>
            {
                this.state.books.map((book, index) => {
                    return <Book key={index} id={book.id} title={book.title} authorName={book.authorName} authorId={book.authorId}></Book>
                })                            
            }
            </div>
           );
    }
    
};

export default Books;