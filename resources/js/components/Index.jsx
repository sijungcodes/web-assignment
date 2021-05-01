import React, { Component } from 'react'
import Reflux from 'reflux'
import ReactDOM from 'react-dom'
import Header from './Header'
import Books from './Books'
import SearchBooks from './SearchBooks'
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
        //empty string sets seatch to sort by asc or desc
        BookActions.getBySearch('');
    }    

    render() {
        return (  
            <section className="sans-serif">
            <Header />
         
            <div className="pa3 mw9 center">
                <section>

                </section>  
                <div className="flex-ns  w-100">
                    <div className="  w-50-ns w-100">
                        <SearchBooks /> 
                    </div>
                    <div className=" w-50-ns w-100 tr">
                    <div className="tr">
                    <button className="bg-black-10  dib b ph3 pv2 input-reset ba b--black grow pointer f6" onClick={this.handleOpenModal}>Add book</button>
                    </div>
                    <ReactModal 
                        isOpen={this.state.showModal}
                        ariaHideApp={false}
                        onRequestClose={this.handleCloseModal}>
                        <span className="fr pa2 f3 hover-bg-black hover-white" onClick={this.handleCloseModal}>✕</span>
                        <AddBook closeModal={this.handleCloseModal} />
                    </ReactModal>                          
                    </div>
                </div>                  
                <Books />
            </div>
            </section>
        )
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(  < App / > , document.getElementById('app'));
}