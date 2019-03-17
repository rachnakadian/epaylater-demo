const home = (state = {}, action) => {
	switch (action.type) {
		case 'init':
		return { booksByName: [], bookByISBN: {}, bookDetails: {} }

		case 'updateBooks':
		return { ...state, booksByName: action.booksByName, bookByISBN: action.bookByISBN }

		case 'updateBookDetails':
		return {...state, bookDetails: action.data}

		case 'clearBooksData':
		return {...state, booksByName: [], bookByISBN: {}}

		case 'clearBookDetails':
		return {...state, bookDetails: {}}

		default:
		return state
	}
}

export default home;