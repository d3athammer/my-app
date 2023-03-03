import React, { Component} from 'react';
import { getMovies } from '../services/fakeMovieService';
import { deleteMovie } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import Like from './common/like';

class Movies extends Component {
      state = {
    movies: getMovies(),
    liked: false,
    pageSize: 3,
    currentPage: 1
   };

  deleteMovie = id => {
    deleteMovie(id)
    this.setState({movies: this.state.movies})
   }

  handleLike= (movie) => {
    const updatedMovies = [...this.state.movies];
    const index = updatedMovies.findIndex((m) => m._id === movie._id);
    updatedMovies[index] = { ...updatedMovies[index] };
    updatedMovies[index].liked = !updatedMovies[index].liked;
     this.setState({ movies: updatedMovies });
   }

// handling pages

   //takes in page from onPageChange Props
  handlePageChange = (page) => {
    this.setState({currentPage: page})
  }

  currentPage

  render() {
    const { movies, pageSize, currentPage } = this.state;
    return (
      <div>
        <p>
          {this.state.movies === 0 ? "0 movies available" : `showing ${this.state.movies.length} movies in the database`}
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
            {this.state.movies.map( movie => (
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
            itemsCount={movies.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange} />
      </div>
    );
  }
}

export default Movies;
