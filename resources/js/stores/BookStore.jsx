import Reflux from 'reflux';
import BookActions from '../actions/BookActions';

class BookStore extends Reflux.Store {
    constructor() {
        super();
        this.listenables = BookActions;
        this.urlBooks = '/api/books';
        this.state = {
            sort: 'asc',
            searchBy: 'title',
            query: '',
            books: [],
        }
    }

    getBooks(){
        var url = this.urlBooks + '/' + this.state.sort +'/'+ this.state.searchBy  + '/' + this.state.query;
        fetch(url, { method: 'GET' })
            .then(res => res.text())
            .then(res => this.setBooksState(res))
            .catch(err => err);        
    }

    setBooksState(res){
        this.setState({
            books: JSON.parse(res).map(function(item) {
                return { id: item.id, title: item.title, authorName: item.authors[0].name, authorId: item.authors[0].id }
            })
        })
    }

    setAuthorName(res){

        //Fine in books array book object that has a matching id  

        function findMatchingAuthorId(book) {
            return book.authorId == res.author_id;
        }

        var indexOfMatch = this.state.books.findIndex(findMatchingAuthorId);

        //Create updated books array and set state

        this.state.books[indexOfMatch].authorName = res.name;
        
        this.setState({books: this.state.books});

    }

    onToggleSort(sort){
        this.setState({sort: sort});
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

    onSearchBooks(query){
        var query = encodeURIComponent(query);
        this.setState({query: query});
        this.getBooks();
    }

    onUpdateAuthor(authorId, authorName){

        var url = "/api/update-authors";
        
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
}

export default BookStore;
