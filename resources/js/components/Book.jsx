
import React from 'react';
import Reflux from 'reflux';
import BookActions from '../actions/BookActions';

class Book extends Reflux.Component {
    
    constructor(props) {
        super(props);
    }
    
    handleRemove(id){
      BookActions.removeBook(id);
    }

    handleEditAuthorName(authorId, authorName){
      var newName = prompt("Please enter new name", authorName);
      if (newName != null) {
        BookActions.updateAuthor(authorId, newName);
      }
    }
    
    render() {
        return (
          <article className="dt w-100 bb b--black-05 pb2 mt2" >
            <div className="dtc v-mid ">
              <h1 className="f6 f5-ns fw6 lh-title black mv0 ttc">{this.props.title}</h1>
              <h2 className="f6 fw4 mt0 mb0 black-60">{this.props.authorName}</h2>
            </div>
            <div className="dtc v-mid">
              <div className="w-100 tr">
                <button className="f6 button-reset bg-white ba b--black-10 dim pointer pv1"  onClick={this.handleEditAuthorName.bind(this, this.props.authorId, this.props.authorName)} >edit author name</button>
                <button className="f6 button-reset bg-white ba b--black-10 dim pointer pv1"  onClick={this.handleRemove.bind(this, this.props.id)} >remove book</button>
              </div>
            </div>
          </article>        
        
        );
    }
    
};

export default Book;