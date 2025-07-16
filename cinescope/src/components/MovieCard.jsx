import React, { useState } from 'react';
import { Card, Badge, Placeholder } from 'react-bootstrap';

const MovieCard = ({ movie, onClick }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const imageUrl =
    movie.Poster !== 'N/A'
      ? movie.Poster
      : 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <Card
      className="mb-4 h-100 position-relative"
      onClick={() => onClick(movie.imdbID)}
      style={{ cursor: 'pointer' }}
    >
      {/* Placeholder for image */}
      <div className="position-relative" style={{ height: '320px' }}>
        {!imgLoaded && (
          <Placeholder animation="glow">
            <Placeholder
              className="w-100 h-100 bg-secondary rounded-top"
              style={{ height: '320px' }}
            />
          </Placeholder>
        )}
        <Card.Img
          variant="top"
          src={imageUrl}
          alt={movie.Title}
          onLoad={() => setImgLoaded(true)}
          className="card-img-top"
          style={{
            display: imgLoaded ? 'block' : 'none',
            height: '320px',
            objectFit: 'cover',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
          }}
        />
      </div>

      {/* Card Content */}
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text className="d-flex justify-content-between align-items-center">
          <span>{movie.Year}</span>
          {movie.imdbRating && (
            <Badge bg="warning" text="dark">
              ⭐ {movie.imdbRating}
            </Badge>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
