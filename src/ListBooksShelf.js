import React, {Component} from 'react';
import ListBooks from './ListBooks';

class ListBooksShelf extends Component{
	render(){
		const { books, shelfs, onAlterBook } = this.props;
		return (
			<div>
				{shelfs.map(
					shelf => (
						<div className="bookshelf" key={shelf.value}>
							<h2 className="bookshelf-title">{shelf.label}</h2>
							<ListBooks
								books={books}
								shelfSearch={shelf.value}
								shelfs={shelfs}
								onAlterBook={onAlterBook}
							/>
						</div>
					)
				)}
			</div>
		);
	}
}

export default ListBooksShelf;