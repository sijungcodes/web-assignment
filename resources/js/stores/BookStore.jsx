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
}

export default BookStore;
