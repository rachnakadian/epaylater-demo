import api from '../../lib/api';

const actions = {
	searchBook: function(field, value) {
		return dispatch => {
			let path = '';
			if(field == 'name') {
				path = `http://openlibrary.org/search.json?title=${value}`;
				api.setMethod('get').sendRequest(path, {}, true, function (response) {
					dispatch({
						type: 'updateBooks',
						booksByName: ((response.data != undefined) && response.data.docs && response.data.docs.length) ? response.data.docs : [],
						bookByISBN: {}
					});
				}, dispatch);
			} else {
				path = `https://openlibrary.org/api/books?bibkeys=ISBN:${value}&format=json&jscmd=data`;
				api.setMethod('get').sendRequest(path, {}, true, function (response) {
					dispatch({
						type: 'updateBooks',
						booksByName: [],
						bookByISBN: ((response.data != undefined) && Object.keys(response.data).length) ? {...response.data[`ISBN:${value}`], isbn: `ISBN:${value}`} : {}
					});
				}, dispatch);
			}
		}
	},
	getBookDetails: function(isbn) {
		return dispatch => {
			let path = `https://openlibrary.org/api/books?bibkeys=${isbn}&format=json&jscmd=data`;
			api.setMethod('get').sendRequest(path, {}, true, function (response) {
				dispatch({
					type: 'updateBookDetails',
					data: ((response.data != undefined) && Object.keys(response.data).length) ? response.data[isbn] : {}
				});
			}, dispatch);
		}
	},
	clearBooksData: function() {
		return { type: 'clearBooksData' }
	},
	clearBookDetails: function() {
		return { type: 'clearBookDetails' }
	}
}

export default actions;