import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import { searchMovies, getMovieDetails } from './api';
import { Container, Row, Col, Form } from 'react-bootstrap';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [ratingFilter, setRatingFilter] = useState('0');
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const defaultTerms = ['batman', 'matrix', 'avengers', 'spiderman', 'harry potter', 'star wars', 'inception'];
    const randomTerm = defaultTerms[Math.floor(Math.random() * defaultTerms.length)];
    handleSearch(randomTerm);
  }, [ratingFilter]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setLoading(true);
    setMovies([]);
    const results = await searchMovies(query);
    const filtered = [];

    for (const movie of results) {
      const details = await getMovieDetails(movie.imdbID);
      if (details && parseFloat(details.imdbRating) >= parseFloat(ratingFilter)) {
        filtered.push(details);
      }
    }

    setMovies(filtered);
    if (filtered.length > 0) setFeaturedMovie(filtered[0]);
    setLoading(false);
  };

  const handleCardClick = async (imdbID) => {
    setModalLoading(true);
    setShowModal(true);
    const movie = await getMovieDetails(imdbID);
    setSelectedMovie(movie);
    setModalLoading(false);
  };

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">
      <Header />

      <div className="flex-grow-1">
        <Container>
          <SearchBar onSearch={handleSearch} />

          <Form.Select
            className="mb-4"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
          >
            <option value="0">All Ratings</option>
            <option value="5">5+</option>
            <option value="6">6+</option>
            <option value="7">7+</option>
            <option value="8">8+</option>
          </Form.Select>

          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Fetching awesome movies...</p>
            </div>
          ) : (
            <>
              {featuredMovie && <Hero movie={featuredMovie} />}

              {movies.length === 0 ? (
                <div className="text-center my-5">
                  <p className="fs-5 text-light">
                    No results found for <strong>"{searchQuery}"</strong>
                  </p>
                </div>
              ) : (
                <Row className="g-3">
                  {movies.map((movie) => (
                    <Col key={movie.imdbID} xs={12} sm={6} md={4} lg={3}>
                      <MovieCard movie={movie} onClick={handleCardClick} />
                    </Col>
                  ))}
                </Row>
              )}
            </>
          )}
        </Container>
      </div>

      <MovieModal
        show={showModal}
        onHide={() => setShowModal(false)}
        movie={selectedMovie}
        loading={modalLoading}
      />

      <Footer />
    </div>
  );
};

export default App;
