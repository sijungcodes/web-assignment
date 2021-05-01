import React from 'react';
import Reflux from 'reflux';
import BookStore from '../stores/BookStore';
import BookActions from '../actions/BookActions'


class SortButtons extends Reflux.Component {
    
    constructor(props) {
        super(props);
        this.stores = [BookStore];
        this.storeKeys = ['books'];
        this.onChangeValue = this.onChangeValue.bind(this);
    }

    onChangeValue(e) {
        BookActions.getBySort(e.target.value);
    }    
    
    render() {
        return (
          <div onChange={this.onChangeValue}>
            <label className="mr2"><input type="radio" value="asc" name="sort" defaultChecked /> asc</label>
            <label ><input type="radio" value="desc" name="sort" /> desc</label>
          </div>
        );
    }
    
};

export default SortButtons;