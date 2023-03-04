import React, { Component} from 'react';
import { getMovies } from '../services/fakeMovieService';
import { deleteMovie } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import Like from './common/like';

class Movies extends Component {
      state = {
    allMovies: getMovies(),
    liked: false,
    pageSize: 3,
    currentPage: 1
   };

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

  currentPage

  render() {
    const { allMovies, pageSize, currentPage } = this.state;

    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <div>
        <p>
          {allMovies === 0 ? "0 movies available" : `showing ${allMovies.length} movies in the database`}
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
            itemsCount={allMovies.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
         />
      </div>
    );
  }
}

export default Movies;
