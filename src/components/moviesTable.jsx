import React, { Component } from 'react';
import Like from './common/like';

const MoviesTable = ({ movies, onDelete, onLike }) => {
  // extrating movies table

  // 1. Destructor all the props that we are using
  // 2. import needed components
  // 3. Edit the props to the props created
  // 4. Create the props from parent table
  // 5. Make sure all the functions are named correctly and viola!

  return (
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
            <td>
              <Like
                liked={movie.liked}
                onClick={() => onLike(movie)}
              />
            </td>
            <td>
              <button
                onClick={()=> onDelete(movie)}
                className="btn btn-danger">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    );
}

export default MoviesTable;
