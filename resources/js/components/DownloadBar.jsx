import React from 'react';
import Reflux from 'reflux';
import BookStore from '../stores/BookStore';
import BookActions from '../actions/BookActions'

class DownloadBar extends Reflux.Component {
    
    constructor(props) {
        super(props);
        this.stores = [BookStore];
        this.storeKeys = ['books'];
        this.state = {keys: ['title', 'authorName']}
        this.handleSelect = this.handleSelect.bind(this);
        this.handleDownloadCSV = this.handleDownloadCSV.bind(this);
        this.handleDownloadXML = this.handleDownloadXML.bind(this);
    }

    switchDownloadOption(option){

        switch (option) {
            case 'titles-and-authors':
                return ['title', 'authorName'];
            case 'titles':
                return ['title'];
            case 'authors':
                return ['authorName'];
            default:
                return ['title', 'authorName'];
          }
    }

    handleDownloadCSV(){
        BookActions.convertObjectToCSV(this.state.keys);
    }

    handleDownloadXML(){
        BookActions.convertObjectToXML(this.state.keys);
    }

    handleSelect(e){
        //Set keys array or set to false if no selection is made
        var keysArr = this.switchDownloadOption( e.target.value )
        this.setState({keys:  keysArr});
    }

    render() {
        
        return (
        <div className="w-100 bg-black-10 ba">
            <label className="f6 ma2 dib">download </label>
            <select   value={this.state.select} onChange={this.handleSelect}>
                <option value="titles-and-authors">a list with title and author</option>
                <option value="titles">a list with only titles</option>
                <option value="authors">a list with only authors</option>                    
            </select>
            <div className="dib" >
                <label className="f6 ma2 "><u onClick={this.handleDownloadCSV}>csv</u></label>
                <label className="f6 ma2 "><u onClick={this.handleDownloadXML}>xml</u></label>
            </div>
        </div>
        );
    }
    
};

export default DownloadBar;