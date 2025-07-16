import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import { searchMovies, getMovieDetails } from './api';
import { Container, Row, Col, Form, Placeholder } from 'react-bootstrap';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [ratingFilter, setRatingFilter] = useState('0');
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchRandomMovies();
  }, [ratingFilter]);

  const fetchRandomMovies = async () => {
    setLoading(true);
    setSearchQuery('');
    setMovies([]);
    const defaultTerms = ['batman', 'matrix', 'avengers', 'spiderman', 'harry potter', 'star wars', 'inception', 'mission', 'jurassic', 'iron man'];

    const keywords = defaultTerms.sort(() => 0.5 - Math.random()).slice(0, 3);
    const uniqueMoviesMap = new Map();

    for (const keyword of keywords) {
      const results = await searchMovies(keyword);
      for (const movie of results) {
        if (!uniqueMoviesMap.has(movie.imdbID)) {
          const details = await getMovieDetails(movie.imdbID);
          if (details && parseFloat(details.imdbRating) >= parseFloat(ratingFilter)) {
            uniqueMoviesMap.set(movie.imdbID, details);
          }
        }
      }
    }

    const uniqueMovies = Array.from(uniqueMoviesMap.values());

    setMovies(uniqueMovies);
    const shuffled = uniqueMovies.sort(() => 0.5 - Math.random());
    setFeaturedMovies(shuffled.slice(0, 3));
    setLoading(false);
  };

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
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    setFeaturedMovies(shuffled.slice(0, 3));
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
            <div className="my-5">
              <Row className="g-4">
                {[...Array(8)].map((_, index) => (
                  <Col key={index} xs={12} sm={6} md={4} lg={3}>
                    <div className="card bg-dark text-white h-100">
                      <div
                        className="bg-secondary rounded-top w-100"
                        style={{ height: '320px' }}
                      ></div>
                      <div className="card-body">
                        <p className="placeholder-glow mb-2">
                          <span className="placeholder col-10"></span>
                        </p>
                        <p className="placeholder-glow">
                          <span className="placeholder col-6"></span>
                        </p>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          ) : (
            <>
              {featuredMovies.length > 0 && <Hero movies={featuredMovies} />}

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
