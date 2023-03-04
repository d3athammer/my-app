import React, { Component} from 'react';
import { getMovies, deleteMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/pagination';
import ListGroup from './listGroup';
import { paginate } from '../utils/paginate';
import Like from './common/like';

class Movies extends Component {
      state = {
    allMovies: [],
    allGenres: [],
    currentGenre: [],
    currentGenrePageNumbers: {},
    liked: false,
    pageSize: 3,
    currentPage: 1
   };

   componentDidMount () {
    const allGenres = [{name: "All Genres"}, ...getGenres()]
    this.setState({allMovies: getMovies(), allGenres})
   }

  deleteMovie = id => {
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
  // handleGenreSelect = (genre) => {
  //   this.setState({ selectedGenre: genre, currentPage: 1})
  // }

  handleGenreSelect = (genre) => {
  this.setState(prevState => ({
    ...prevState,
    selectedGenre: genre
  }));
}


  render() {
    const { allMovies, selectedGenre, pageSize, currentPage, allGenres} = this.state;

    // filtering selections based on genre
    const filtered = selectedGenre && selectedGenre._id
      ? allMovies.filter(m => m.genre._id === selectedGenre._id)
      : allMovies;

    // Will only include movies that are under the selected category
    const movies = paginate(filtered, currentPage, pageSize);

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
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th>Like</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map( movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td><Like liked={movie.liked} onClick={() => this.handleLike(movie)} /></td>
                  <td><button onClick={()=> this.deleteMovie(movie._id)} className="btn btn-danger">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
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
