import React, { Component } from 'react'
import Reflux from 'reflux'
import ReactDOM from 'react-dom'
import Header from './Header'
import Books from './Books'
import SearchBooks from './SearchBooks'
import DownloadBar from './DownloadBar'
import SortButtons from './SortButtons'
import AddBook from './AddBook'
import BookStore from '../stores/BookStore'
import BookActions from '../actions/BookActions'
import ReactModal from 'react-modal';



class App extends Reflux.Component {

    constructor(props) {
        super(props);
        this.stores = [BookStore];
        this.storeKeys = ['books'];
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);           
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }
      
    handleCloseModal () {
        this.setState({ showModal: false });
    }

    UNSAFE_componentWillMount() {
        BookActions.searchBooks('');
    }    

    render() {
        return (  
            <section>
            <Header />
            <div className="pa3 mw9 center sans-serif">
                <section className="cf">
                <div className="fl w-100 w-50-ns">
                <SearchBooks />
                </div>
                <div className="fl w-100 w-50-ns ">

                </div>
                </section>
                <SortButtons />
                <section className="cf">
                    <div className="fl w-100 w-50-ns">
                        <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={this.handleOpenModal}>Add book</button>
                        <ReactModal 
                            isOpen={this.state.showModal}
                            contentLabel="onRequestClose Example"
                            onRequestClose={this.handleCloseModal}>
                            <p>Modal text!</p>
                            <button  onClick={this.handleCloseModal}>Close Modal</button>
                            <AddBook />
                        </ReactModal>                           
                    </div>
                    <div className="fl w-100 w-50-ns"><DownloadBar /></div>
                </section>

                <Books />
            </div>
            </section>
        )
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(  < App / > , document.getElementById('app'));
}