import React from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

const MovieModal = ({ show, onHide, movie, loading }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      contentClassName="bg-dark text-white"
    >
      <Modal.Header closeButton>
        <Modal.Title>{loading ? 'Loading...' : movie?.Title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading || !movie ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="light" />
            <p className="mt-3">Fetching movie details...</p>
          </div>
        ) : (
          <>
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
              alt={movie.Title}
              className="img-fluid mb-3 rounded"
            />
            <p><strong>Year:</strong> {movie.Year}</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieModal;
