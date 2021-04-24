import Reflux from 'reflux';

const BookActions = Reflux.createActions(['getInitialBookData', 'addBook', 'removeBook', 'searchBooks']);

export default BookActions;