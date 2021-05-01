import Reflux from 'reflux';
import BookActions from '../actions/BookActions';
import xmljs from 'xml-js';
import objectToCsv from 'object-to-csv';

class BookStore extends Reflux.Store {
    constructor() {
        super();
        this.listenables = BookActions;
        this.urlBooks = '/api/books';
        this.urlAuthors = '/api/authors';
        this.state = {
            querySelect: 'title',
            sort: 'asc',
            search: '',
            books: [],
        }
    }

    setBooksState(res){
        this.setState({
            books: JSON.parse(res).map(function(book) {
                return { id: book.id, 
                        title: book.title,
                        authorName: book.authors[0].name, 
                        authorId: book.authors[0].id 
                }
            })
        })
    }
    
    setAuthorName(res)
    {
        function findMatchingAuthorId(book) {
            return book.authorId == res.id;
        }
        //Find author by id within books array
        var indexOfMatch = this.state.books.findIndex(findMatchingAuthorId);

        //Create up to date books array and set state
        this.state.books[indexOfMatch].authorName = res.name;
        this.setState({books: this.state.books});
    }

    onAddBook(bookTitle, bookAuthor){
        var requestData = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
                "X-Requested-With": "XMLHttpRequest",
                },
            method: "post",
            credentials: "same-origin",
            body: JSON.stringify({title: bookTitle, author: bookAuthor})
        }
        fetch(this.urlBooks, requestData)
            .then(res => res.text())
            .then(res => this.setBooksState(res))
            .catch(err => err);        
    }

    onRemoveBook(bookId){
        var requestData = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
                "X-Requested-With": "XMLHttpRequest",
                "_method": "DELETE"
                },
            method: "post",
            credentials: "same-origin",
            body: JSON.stringify({_method:  "DELETE",  id: bookId})
        }
        fetch(this.urlBooks, requestData)
            .then(res => res.text())
            .then(res => this.setBooksState(res))
            .catch(err => err);          
    }

    onSetQuerySelect(querySelect){
        this.setState({querySelect: querySelect});
    }   

    onGetBySort(sort){
        this.setState({sort: sort});
        this.onRequestBooks();
    }  

    onGetBySearch(search){
        this.setState({search: search});
        this.onRequestBooks(search);
    }      

    onRequestBooks(){
        var url = this.urlBooks + '/by-'+this.state.querySelect+'/' + this.state.sort + '/' + encodeURIComponent(this.state.search)
        fetch(url, { method: 'GET' })
            .then(res => res.text())
            .then(res => this.setBooksState(res))
            .catch(err => err);          
    }

    onUpdateAuthor(authorId, authorName){

        var url = this.urlAuthors + "/update";
        
        var requestData = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
                "X-Requested-With": "XMLHttpRequest",
                },
            method: 'post',
            credentials: "same-origin",
            body: JSON.stringify({id: authorId, name: authorName})
        }
        fetch(url, requestData)
            .then(res => res.text())
            .then(res => this.setAuthorName(JSON.parse(res)))
            .catch(err => err);    
    }   

    constructArrayOfObjects(keys){
        
        return this.state.books.map(function(book){
            var objectToBeReturned = {};

            for(var i = 0; i < keys.length; i++){
                if (keys[i] in book){
                    objectToBeReturned[keys[i]] = book[keys[i]];
                }
            }
            return objectToBeReturned;
        });
    }    

    async onConvertObjectToCSV(keyArray){
        let data = this.constructArrayOfObjects(keyArray);
        let keys = Object.keys(data[0]).map((key) => ({ key: key, as: key }));
        var otc = new objectToCsv({ keys: keys,data: data });
        var csv = await otc.getCSV();
        window.location = "data:application/csv," + encodeURIComponent(csv);
        return csv;
    }

    async onConvertObjectToXML(keyArray){
        let data = this.constructArrayOfObjects(keyArray);
        var options = {compact: true, ignoreComment: true, spaces: 4};
        var xml = await xmljs.js2xml(data, options);
        window.location = "data:application/octet-stream," + encodeURIComponent(xml);
        return  xml;
    }    
    
}

export default BookStore;
