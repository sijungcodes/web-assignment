import Reflux from 'reflux';

const BookActions = Reflux.createActions([ 
'addBook', 
'removeBook', 
'setQuerySelect',
'getBySort', 
'getBySearch', 
'updateAuthor', 
'convertObjectToCSV', 
'convertObjectToXML']);

export default BookActions;