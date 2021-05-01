import React from 'react';
import Reflux from 'reflux';
import BookStore from '../stores/BookStore';
import BookActions from '../actions/BookActions'

class QuerySelectRadio extends Reflux.Component {
    
    constructor(props) {
        super(props);
        this.stores = [BookStore];
        this.storeKeys = ['books'];
        this.onChangeValue = this.onChangeValue.bind(this);
    }

    onChangeValue(e) {
        BookActions.setQuerySelect(e.target.value);
    }    
    
    render() {
        return (
          <div onChange={this.onChangeValue}>
            <label className="mr2"><input type="radio" value="title" name="query-select-radio" defaultChecked /> title</label>
            <label ><input type="radio" value="author" name="query-select-radio" /> author</label>
          </div>
        );
    }
    
};

export default QuerySelectRadio;