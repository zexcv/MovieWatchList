import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSpinner, faFilm } from "@fortawesome/free-solid-svg-icons";
import Movie from '../components/Movie'
import Header from "../components/Header";

export default function ListPage() {
  const [moviesD, setMoviesD] = useState([]);
  const [found, setFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef("");
  const api_key = "e1f6fd51";

  console.log(moviesD)


  function keyPress(event) {
    if (event.key === "Enter") {
      searchSelection();
    }
  }
// SEARCH FUNCTION
  function searchSelection() {
    setIsLoading(true);
    let films = [];

    fetch(`http://www.omdbapi.com/?apikey=${api_key}&s=${inputRef.current.value}`)
      .then((res) => res.json())
      .then((data) => {

        if (data.Response === "True") {
          films = data.Search;

          const fetchPromises = films.map((movie) =>
            fetch(`https://www.omdbapi.com/?apikey=e1f6fd51&i=${movie.imdbID}`)
              .then((res) => res.json())
          );

          Promise.all(fetchPromises)
            .then((moviesData) => {
              setMoviesD(moviesData);
              setFound(true);
              setIsLoading(false)
            })
            .catch((error) => {
              console.error("Error fetching movie details:", error);
            });
        } else {
          setFound(false);
          setIsLoading(false)
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching search results:", error);
      });
  }

  // NOTHING FOUND
  const notFoundEl = 
    <div className="not-found">
      <div><FontAwesomeIcon icon={faFilm} className="not-found-icon" /></div>
      <h3>Sorry, couldn't find that movie.<br /> Please try another search.</h3>
    </div>;

  // LOADING ANIMATION
  const loadingAnimation = (
    <div className="loading-animation not-found">
      <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
      Loading...
    </div>
  );
  

  // MOVIE COMPONENT
  const moviesEls = moviesD.map((movie) => (
    <Movie key={movie.imdbID} movie={movie} />
  )
    
  );


  return (
    <section onKeyDown={keyPress}>
      <Header />
      <div className="watchlist-container">
        <div className="input-search">
          <div className="icon-div">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          </div>
          <input ref={inputRef} type="text" placeholder="Search for a movie" />
          <button onClick={searchSelection}>Search</button>
        </div>
        <div className="movies-list">
          {isLoading ? loadingAnimation : found ? moviesEls : notFoundEl}
        </div>
      </div>
    </section>
  );
}
