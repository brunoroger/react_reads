import React, {Component} from 'react';
import PropTypes from 'prop-types'

class ListBooks extends Component{
	render(){
		const { books, shelfSearch, shelfs, onAlterBook } = this.props;
		return (
			<div className="bookshelf-books">
				<ol className="books-grid">
					{books.filter((book) => (shelfSearch === "none" || book.shelf === shelfSearch)).map(
						(book) => (
							<li key={book.id}>
								<div className="book">
								  <div className="book-top">
									{book.imageLinks &&
										<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+ book.imageLinks.smallThumbnail +'")' }}></div>
									}
									<div className="book-shelf-changer">
									  <select value={book.shelf} onChange={(event) => { onAlterBook(book, event.target.value); }}>
										<option value="none" disabled>Move to...</option>
										{shelfs.map(
											shelf_option => (
												<option key={shelf_option.value} value={shelf_option.value}>{shelf_option.label}</option>
											)
										)}
									  </select>
									</div>
								  </div>
								  <div className="book-title">{book.title}</div>
								  <div className="book-authors">{book.authors}</div>
								</div>
							</li>
						)
					)}
				</ol>
			</div>
		);
	}
}

ListBooks.propTypes= {
	books: PropTypes.array
}

export default ListBooks;