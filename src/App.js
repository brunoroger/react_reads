import React from 'react'
import {Route, Link} from 'react-router-dom'
import { Debounce } from 'react-throttle';
import * as BooksAPI from './BooksAPI';
import ListBooksShelf from './ListBooksShelf';
import ListBooks from './ListBooks';
import './App.css'

class BooksApp extends React.Component {
  state = {
	books: [],
	booksSearch: [],
	shelfs: [
		{
			label: "none",
			value: "none",
			visible: false
		},
		{
			label: "Currently Reading",
			value: "currentlyReading",
			visible: true
		},
		{
			label: "Want to Read",
			value: "wantToRead",
			visible: true
		},
		{
			label: "Read",
			value: "read",
			visible: true
		}
	]
  }

  componentDidMount(){
	BooksAPI.getAll().then((books) => {
		this.setState({ books });
	});
  }
  
  alterBook = (book, shelf) => {
	BooksAPI.update(book, shelf).then((res) => {
		book.shelf = shelf;
		
		this.setState(state => ({
			books: state.books.filter(bookPrev => book.id !== bookPrev.id).concat([ book ])
		}));
	});
  }
  
  searchBook = (search) => {
	BooksAPI.search(search).then((books) => {
		if(!Array.isArray(books)){
			this.setState({ booksSearch: [] });
		}else{
			books.map(book => (this.state.books.filter((b) => b.id === book.id).map(b => book.shelf = b.shelf)))
			
			this.setState({ booksSearch: books });
		}
	});
  }
  
  render() {
    return (
      <div className="app">
        <Route path="/search" render={ ( {history} )=> (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
				<Debounce time="400" handler="onChange">
					<input type="text" onChange={(event) => { this.searchBook(event.target.value); }} placeholder="Search by title or author"/>
				</Debounce>
              </div>
            </div>
            <div className="search-books-results">
              <ListBooks
					books={this.state.booksSearch}
					shelfSearch="none"
					shelfs={this.state.shelfs}
					onAlterBook={this.alterBook}
				/>
            </div>
          </div>
		)} />
        <Route exact path="/" render={ () => ( 
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
			  <ListBooksShelf
					books={this.state.books}
					shelfs={this.state.shelfs}
					onAlterBook={this.alterBook}
			  />
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
