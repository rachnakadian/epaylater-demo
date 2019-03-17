import React, {Component} from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions';

class Detail extends Component {
	
	componentDidMount() {
		this.props.actions.getBookDetails(this.props.match.params.isbn);
	}

	componentWillUnmount() {
		this.props.actions.clearBookDetails();
	}
	
    render () {
    	let details = this.props.details && Object.keys(this.props.details).length ? this.props.details : {};
        return (
        	<div className='detail-sec'>
        		<h2 className='book-title'><a target='_blank' href={details.url}><strong> {details.title ? details.title : ''}</strong></a></h2>
        		<div className='book-title'> {details.by_statement ? details.by_statement : ''}</div>
	        	<div className='img-sec'>
	        		{details.cover && details.cover.medium ? <img src={details.cover.medium} /> : ''}
	        	</div>
	        	<div className='right-sec'>
	        		
	        		<span className='book-fields'><strong>Author(s):</strong> {details.authors && details.authors.length ? (
	        			details.authors.map((author, index) => <span key={index}><a target='_blank' href={author.url}>{author.name}{index > 0 ? ',' : ''}</a></span>)
	        		) : ''}</span>
	        		<span className='book-fields'><strong>No of pages:</strong> {details.number_of_pages ? details.number_of_pages : ''}</span>
	        		<span className='book-fields'><strong>Publish year:</strong> {details.publish_date ? details.publish_date : ''}</span>
	        		<span className='book-fields'><strong>Publisher(s):</strong> {details.publishers && details.publishers.length ? (
	        			details.publishers.map((publisher, index) => <span key={index}>{publisher.name}{index > 0 ? ',' : ''}</span>)
	        		) : ''}</span>
	        		<span className='book-fields'><strong>Published at:</strong> {details.publish_places && details.publish_places.length ? (
	        			details.publish_places.map((place, index) => <span key={index}>{place.name}{index > 0 ? ',' : ''}</span>)
	        		) : ''}</span>
	        	</div>
	        </div>
        )
    }
}

const mapStateToProps = (state) => {
	return {
		details: state.home.bookDetails
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));