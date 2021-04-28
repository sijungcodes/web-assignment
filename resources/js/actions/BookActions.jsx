import Reflux from 'reflux';

const BookActions = Reflux.createActions([ 'addBook', 'removeBook', 'searchBooks', 
'toggleSort', 'updateAuthor', 'convertObjectToCSV', 'convertObjectToXML']);

export default BookActions;