import React, {Component} from 'react';
import ListBooks from './ListBooks';

const ListBooksShelf = ({books, shelfs, onAlterBook}) =>
<div>
	{shelfs.filter((shelf) => (shelf.visible)).map(
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
</div>;

export default ListBooksShelf;