import React, { Component} from 'react';
import { getMovies, deleteMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/pagination';
import ListGroup from './listGroup';
import { paginate } from '../utils/paginate';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component {
      state = {
    allMovies: [],
    allGenres: [],
    liked: false,
    pageSize: 3,
    currentPage: 1,
    sortColumn: { path: 'title', order: 'asc'}
   };

   componentDidMount () {
    const allGenres = [{ _id: "", name: "All Genres"}, ...getGenres()]
    this.setState({allMovies: getMovies(), allGenres})
   }

  handleDelete = id => {
    deleteMovie(id)
    this.setState({allMovies: this.state.allMovies})
   }

  handleLike= (movie) => {
    const updatedMovies = [...this.state.allMovies];
    const index = updatedMovies.findIndex((m) => m._id === movie._id);
    updatedMovies[index] = { ...updatedMovies[index] };
    updatedMovies[index].liked = !updatedMovies[index].liked;
     this.setState({ allMovies: updatedMovies });
   }

// handling pages

   //takes in page from onPageChange Props
  handlePageChange = (page) => {
    this.setState({currentPage: page})
  }

  // Selecting the genre from your list
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1})
  }

  // To apply the sort when headings are clicked on
  handleSort = sortColumn => {
    this.setState({ sortColumn })
  }


  render() {
    const { allMovies, selectedGenre, pageSize, currentPage, sortColumn, allGenres} = this.state;

    // filtering selections based on genre
    const filtered = selectedGenre && selectedGenre._id
      ? allMovies.filter(m => m.genre._id === selectedGenre._id)
      : allMovies;
    // take the filtered list, sort by name of column, and in which order respectively
      const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
    // Will only include movies that are under the selected SORTED category
    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <div className='row mt-5'>
        <div className="col-3">
          <ListGroup
            items={allGenres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
             />
        </div>
        <div className="col-9">
          <p>
            {filtered.length === 0 ? "0 movies available" : `showing ${filtered.length} movies in the database`}
          </p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
              itemsCount={filtered.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
