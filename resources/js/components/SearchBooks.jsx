import React from 'react';
import Reflux from 'reflux';
import BookStore from '../stores/BookStore';
import BookActions from '../actions/BookActions';
import SortButtons from './SortButtons';
import QuerySelectRadio from './QuerySelectRadio'

class SearchBooks extends Reflux.Component {

    constructor(props) {
        super(props);
        this.state = {search: ''};
        this.stores = [BookStore];
        this.storeKeys = ['books'];
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchBooks = this.handleSearchBooks.bind(this); 
        this.handleClearSearch = this.handleClearSearch.bind(this); 
    }

    handleSearchChange(e) {
      this.setState({search: e.target.value});
    }

    handleClearSearch(){
      this.setState({search: ''});
      //empty string sets seatch to sort by asc or desc
      BookActions.getBySearch('');
    }

    handleSearchBooks(e) {      
        if(this.state.search){
          BookActions.getBySearch(this.state.search);
        }else{
          //empty string sets seatch to sort by asc or desc
          BookActions.getBySearch('');
        }
        e.preventDefault();
   }    

    render() {
        return (
        <div className="mw6 mw6-ns hidden ba">   
          <h1 className="f4 bg-black-10 mv0 pv2 ph3 dn">Search</h1> 
          <div className="pa3">   
              <input className="ph3 pv2 mb2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text"value={this.state.search} onChange={this.handleSearchChange} placeholder="search" />   
              <div className="mb2 dib pa2 w-50 ba">
                <QuerySelectRadio />
              </div>
              <div className="mb2 dib pa2 w-50 ba">
                <SortButtons />
              </div>
              <div className="mb2">
                <button className="bg-black-10 b ph3 w-70 pv2 input-reset ba  b--black  dim pointer f6 dib"  onClick={this.handleSearchBooks}>Search</button>
                <button className="bg-black-10 b ph3 w-30 pv2 input-reset ba  b--black  dim pointer f6 dib"  onClick={this.handleClearSearch}>Clear</button>
              </div>
          </div>          
        </div>


        );
      }
};

export default SearchBooks;    