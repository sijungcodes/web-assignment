import Reflux from 'reflux';
import BookActions from '../actions/BookActions';

class BookStore extends Reflux.Store {
    constructor() {
        super();
        this.listenables = BookActions;
        this.url = '/api/books';
        this.state = {
            sort: 'asc',
            searchBy: 'title',
            query: '',
            books: [],
            note: 'hello'
        }
    }

    setBooksState(res){
        this.setState({
            books: JSON.parse(res).map(function(item, index) {
                return { id: item.id, title: item.title, authorName: item.authors[0].name, authorId:item.authors[0].id }
            })
        })
    }

    onToggleSort(sort){
        this.setState({sort: sort});
        this.onSearchBooks('');
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
        fetch(this.url, requestData)
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
        fetch(this.url, requestData)
            .then(res => res.text())
            .then(res => this.setBooksState(res))
            .catch(err => err);          
    }

    onSearchBooks(query){
        var query = encodeURIComponent(query);
        this.setState({query: query});
        var url = this.url + '/' + this.state.sort +'/'+ this.state.searchBy  + '/' + query;
        fetch(url, { method: 'GET' })
            .then(res => res.text())
            .then(res => this.setBooksState(res))
            .catch(err => err);
    }
}

export default BookStore;
