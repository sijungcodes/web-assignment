import Reflux from 'reflux';
import BookActions from '../actions/BookActions';

class BookStore extends Reflux.Store {
    constructor() {
        super();
        this.listenables = BookActions;
        this.state = {
            books: [{"id":45,"title":"my book title","created_at":"2021-04-24 00:37:52","updated_at":"2021-04-24 00:37:52"}],
            note: 'hello'
        }
    }

    onGetInitialBookData() {

        var url = "http://localhost/api/books";

        fetch(url, { method: 'GET' })
            .then(res => res.text())
            .then(res => this.setState({
                books: JSON.parse(res).map(function(item, index) {
                    return { id: item.id, title: item.title}
                })
            }))
            .catch(err => err);
    }

    onAddBook(bookTitle){
        var url = "http://localhost/api/books";

        var requestData = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
                "X-Requested-With": "XMLHttpRequest",
                },
            method: 'post',
            credentials: "same-origin",
            body: JSON.stringify({title: bookTitle})
        }
        fetch(url, requestData)
            .then(res => res.text())
            .then(res => this.setState({
                books: JSON.parse(res).map(function(item, index) {
                    return { id: item.id, title: item.title}
                })
            }))
            .catch(err => err);        
    }

    onRemoveBook(bookId){
        var url = "http://localhost/api/books";
        alert(bookId);
        var requestData = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
                "X-Requested-With": "XMLHttpRequest",
                "_method": "DELETE"
                },
            method: 'post',
            credentials: "same-origin",
            body: JSON.stringify({_method:  "DELETE",  id: bookId})
        }
        fetch(url, requestData)
            .then(res => res.text())
            .then(res => this.setState({
                books: JSON.parse(res).map(function(item, index) {
                    return { id: item.id, title: item.title}
                })
            }))
            .catch(err => err);          
    }
}

export default BookStore;
