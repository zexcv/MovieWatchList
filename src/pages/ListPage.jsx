import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  // faPlus,
  // faMinus,
  // faStar,
} from "@fortawesome/free-solid-svg-icons";

export default function ListPage() {
  const [moviesD, setMoviesD] = useState([]);
  const [found, setFound] = useState(false);
  const inputRef = useRef("");
  let api_key = "e1f6fd51";
  
  function keyPress(event){
    if(event.key === "Enter"){
      searchSelection()
    }
  }

  function searchSelection() {
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
            })
            .catch((error) => {
              console.error("Error fetching movie details:", error);
            });
  
          setFound(true);
        } else {
          setFound(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  }
  

  const moviesEls = moviesD.map((movie) => (
    <div key={movie.imdbID} className="movie-component">
      <div className="movie">
        <div className="poster">
          <img src={movie.Poster} alt="poster" />
        </div>
        <div className="movie-info">
          <h1>Tytuł: {movie.Title}</h1>
          <p>Year: {movie.Year}</p>
          <p>Plot: {movie.Plot}</p>
        </div>
      </div>
      <hr />
    </div>
  ));

  return (
    <section onKeyDown={keyPress}>
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
          {found ? moviesEls : "No movies found"}
        </div>
      </div>
    </section>
  );
}


// function searchSelection() {
//   let films = []
//   let filmsInfo = []

//   fetch(`http://www.omdbapi.com/?apikey=${api_key}&s=${inputRef.current.value}`)
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.Response === "True") {
//         films = data.Search
//         films.forEach((movie) => {
//         fetch(`https://www.omdbapi.com/?apikey=e1f6fd51&i=${movie.imdbID}`)
//           .then((res) => res.json())
//           .then(data => {
//             filmsInfo.push(data)
//           });
//         });
//         setFound(true);
//         console.log(filmsInfo)
//       } else {
//         setFound(false);
//       }
//     });
// }