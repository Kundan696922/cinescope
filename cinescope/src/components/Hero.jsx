import React from 'react';
import { Container, Badge } from 'react-bootstrap';

const Hero = ({ movie }) => {
  if (!movie) return null;

  const imageUrl = movie.Poster !== 'N/A'
    ? movie.Poster
    : 'https://via.placeholder.com/1200x600?text=No+Poster';

  return (
    <div
      className="hero-banner mb-4"
      style={{
        position: 'relative',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '65vh',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.1))',
        }}
      />
      <Container className="h-100 d-flex flex-column justify-content-end p-4 text-white" style={{ position: 'relative' }}>
        <h1 className="fw-bold display-5 mb-2">{movie.Title}</h1>
        <p className="mb-1 d-none d-md-block">{movie.Plot}</p> {/* Hidden on small devices */}
        <div className="d-flex align-items-center gap-3 mt-2 flex-wrap">
          <Badge bg="warning" text="dark">⭐ {movie.imdbRating}</Badge>
          <Badge bg="secondary">{movie.Year}</Badge>
          {movie.Genre?.split(',').slice(0, 3).map((g, i) => (
            <Badge bg="light" text="dark" key={i}>{g.trim()}</Badge>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Hero;
