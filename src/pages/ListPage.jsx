import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPlus,
  faMinus,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

export default function ListPage() {
  const [movies, setMovies] = useState([]);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef("");

  function searchSelection() {
    fetch(
      `http://www.omdbapi.com/?apikey=e1f6fd51&s=${inputRef.current.value}&type=movie`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.Response === "True") {
          setMovies(data.Search);
          setSearched(true);
        } else {
          setSearched(false);
        }
      });
  }

  const moviesEls = movies.map((movie) => (
    <div className="movie-component">
      <div className="movie">
        <div className="poster">
          <img src={movie.Poster} alt="poster" />
        </div>
        <div className="movie-info">
          <h1>Tytuł: {movie.Title}</h1>
          <p>Year: {movie.Year}</p>
        </div>
      </div>
      <hr />
    </div>
  ));

  return (
    <section>
      <div className="header">
        <div className="header-text">
          <div className="find-text">Find your film</div>
          <div className="link-container">
            <Link to="/watchlist">Watchlist</Link>
          </div>
        </div>
      </div>
      <div className="watchlist-container">
        <div className="input-search">
          <div className="icon-div">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for a movie"
          ></input>
          <button onClick={searchSelection}>Search</button>
        </div>
        <div className="movies-list">
          {searched ? moviesEls : "No movies found"}
        </div>
      </div>
    </section>
  );
}
