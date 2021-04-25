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
      if(e.target.value == ""){
        BookActions.getInitialBookData();
      }
    }

    handleSearchBooks(e) {      
        e.preventDefault();
        if(this.state.search){
          BookActions.searchBooks(this.state.search);
        }else{
          //search field is empty return default book list
          BookActions.getInitialBookData();
        }
        
   }    

    render() {
        return (

        <div className=" mw6 mw6-ns hidden ba mv4">   
          <h1 className="f4 bg-near-black white mv0 pv2 ph3">Search</h1> 
          <div className="pa3 bt">   
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text"value={this.state.search} onChange={this.handleSearchChange} placeholder="search by title" />
                  
              <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"  onClick={this.handleSearchBooks}>Search</button>
          </div>
        </div>


        );
      }
};

export default SearchBooks;    