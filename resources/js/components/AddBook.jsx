import React from 'react';
import Reflux from 'reflux';
import BookStore from '../stores/BookStore'
import BookActions from '../actions/BookActions'


class AddBook extends Reflux.Component {
    constructor(props) {
      super(props);
      this.state = {title: '', author: '', showModal: false};
      this.stores = [BookStore];
      this.storeKeys = ['books'];
      this.handleTitleChange = this.handleTitleChange.bind(this);
      this.handleAuthorChange = this.handleAuthorChange.bind(this);
      this.handleAddBook = this.handleAddBook.bind(this);   
    }

    handleCloseModal() {
      this.props.closeModal();
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
          this.handleCloseModal();
        }else{
          alert("Author field cannot be blank");
        }      
      }else{
        alert("Title field cannot be blank");
      }
    }
  
    render() {
      return (
      <main className="pa4 black-80 sans-serif">
        <form className="measure center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Add Book</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="title">Title</label>
              <input name="title" className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" value={this.state.title} onChange={this.handleTitleChange} placeholder="title"/>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="author">Author</label>
              <input name="author" className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" value={this.state.author} onChange={this.handleAuthorChange} placeholder="author"/>
            </div>
          </fieldset>
          <div>
            <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={this.handleAddBook} >Add book</button>
          </div>
        </form>
      </main>


      );
    }
}

export default AddBook;