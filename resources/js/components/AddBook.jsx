import React from 'react';
import Reflux from 'reflux';
import BookStore from '../stores/BookStore'
import BookActions from '../actions/BookActions'

class AddBook extends Reflux.Component {
    constructor(props) {
      super(props);
      this.state = {title: '', author: ''};
      this.stores = [BookStore];
      this.storeKeys = ['books'];
      this.handleTitleChange = this.handleTitleChange.bind(this);
      this.handleAuthorChange = this.handleAuthorChange.bind(this);
      this.handleAddBook = this.handleAddBook.bind(this);
    }
  
    handleTitleChange(e) {
        this.setState({title: e.target.value});
    }

    handleAuthorChange(e) {
      this.setState({author: e.target.value});
    } 

    handleAddBook(e) {      
      e.preventDefault();
      //confirm("Add " + this.state.title + " by " + this.state.author);
      if(this.state.title !== ''){
        if(this.state.author){
          BookActions.addBook(this.state.title, this.state.author);
          this.setState({title:'', author: ''});
        }else{
          alert("Author field cannot be blank");
        }      
      }else{
        alert("Title field cannot be blank");
      }
    }
  
    render() {
      return (
        <div className=" mw5 mw6-ns hidden ba mv4">   
          <h1 className="f4 bg-near-black white mv0 pv2 ph3">Add Book</h1> 
          <div className="pa3 bt">   
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" value={this.state.title} onChange={this.handleTitleChange} placeholder="title"/>
            
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" value={this.state.author} onChange={this.handleAuthorChange} placeholder="author"/>
                     
              <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={this.handleAddBook} >Add book</button>
          </div>
        </div>
      );
    }
}

export default AddBook;