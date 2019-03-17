import React, {Fragment, Component} from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cookie from 'react-cookies';

import actions from '../actions';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchBy: 'name',
			name: '',
			isbn: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.searchBook = this.searchBook.bind(this);
		this.openDetails = this.openDetails.bind(this);
	}

	handleChange(e) {
		let { name, value } = e.target;
		let state = { [name]: value };
		if(name == 'searchBy') {
			state['name'] = '';
			state['isbn'] = '';
		}
		if((this.props.booksByName && this.props.booksByName.length) || (this.props.bookByISBN && Object.keys(this.props.bookByISBN).length)) {
			this.props.actions.clearBooksData();
		}
		this.setState( state );
	}

	searchBook(e) {
		e.preventDefault();
		this.props.actions.searchBook(this.state.searchBy, this.state[this.state.searchBy]);
	}

	openDetails(isbn) {
		this.props.history.push(`/bookDetails/${isbn}`);
	}

    render () {
        return (
        	<div>
	        	<div className='search-sec'>
	        		
	        		<div className='form-sec'>
				        <div className='radio-input-sec'>
				        	<div className='head'>Search Books</div>
				        	<ul className='radio-list'>
				        		<li>
					        		<div className='radio-sec'>
						        		<input id='byName' type="radio" name='searchBy' value='name' checked={this.state.searchBy == 'name' ? true : false} onChange={this.handleChange} />
						        		<label htmlFor='byName'>By Name</label>
					        		</div>
				        		</li>
				        		<li>
					        		<div className='radio-sec'>
						        		<input id='byISBN' type="radio" name='searchBy' value='isbn' checked={this.state.searchBy == 'isbn' ? true : false} onChange={this.handleChange} />
						        		<label htmlFor='byISBN'>By ISBN</label>
					        		</div>
				        		</li>
				        	</ul>
				        </div>
		        		<div className='input-sec'>
			        		<InputComp {...this.state} handleChange={this.handleChange} />
			        		<button type='submit' onClick={this.state[this.state.searchBy] ? (e) => this.searchBook(e) : ()=>{}}>Search</button>
		        		</div>
	        		</div>
	        	</div>
	        	<div className='search-results'>
	        		{(this.state.searchBy == 'name') && this.props.booksByName && this.props.booksByName.length ? (
	        			<Fragment>
	        				{this.props.booksByName.map((book, index) =>
	        					<div className='book-col' key={index} onClick={(e) => this.openDetails(book.isbn[0])}>
		        					<div className='details'>
			        					<span className='title'><strong>Title:</strong>{book.title ? book.title : ''}</span>
			        					{book.author_name && book.author_name[0] ? <div><strong>Author:</strong> {book.author_name[0]}</div> : ''}
			        					{book.first_publish_year ? <div><strong>Publish Year:</strong> {book.first_publish_year}</div> : ''}
		        					</div>

		        				</div>
		        			)}
	        			</Fragment>
	        		) : ''}
	        		{(this.state.searchBy == 'isbn') && this.props.bookByISBN && Object.keys(this.props.bookByISBN).length ? (
	        			<div className='book-col' onClick={(e) => this.openDetails(this.props.bookByISBN.isbn)}>
	        				<div className='details'>
		        				<span className='title'><strong>Title:</strong>{this.props.bookByISBN.title ? this.props.bookByISBN.title : ''}</span>
	        					{this.props.bookByISBN.authors && this.props.bookByISBN.authors[0] ? <span><strong>Author:</strong> {this.props.bookByISBN.authors[0].name}</span> : ''}
	        					{this.props.bookByISBN.publish_date ? <div><strong>Publish Year:</strong> {this.props.bookByISBN.publish_date}</div> : ''}
        					</div>
	        			</div>
	        		) : ''}
		        </div>
	        </div>
        )
    }
}

const InputComp = (props) => {
	return <input type='test' name={props.searchBy} value={props[props.searchBy]} onChange={props.handleChange} autoComplete='off' />
}

const mapStateToProps = (state) => {
	return {
		booksByName: state.home.booksByName,
		bookByISBN: state.home.bookByISBN
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));