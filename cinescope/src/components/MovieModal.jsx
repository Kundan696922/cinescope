import React from 'react';
import { Modal, Button, Placeholder } from 'react-bootstrap';

const MovieModal = ({ show, onHide, movie, loading }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      contentClassName="bg-dark text-white"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {loading ? (
            <Placeholder as="span" animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
          ) : (
            movie?.Title
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading || !movie ? (
          <>
            <Placeholder animation="glow">
              <Placeholder className="w-100 mb-3" style={{ height: '450px' }} />
              <Placeholder xs={4} /> <Placeholder xs={6} />
              <Placeholder xs={3} /> <Placeholder xs={7} />
              <Placeholder xs={2} /> <Placeholder xs={8} />
              <Placeholder xs={5} /> <Placeholder xs={5} />
            </Placeholder>
          </>
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
