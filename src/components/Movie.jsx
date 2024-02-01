import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck, faStar } from "@fortawesome/free-solid-svg-icons";

export default function Movie({ movie }) {
const [watchlistIcon, setWatchlistIcon] = useState(faPlus)

useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    const isOnWatchlist = storedWatchlist.some((item) => item.imdbID === movie.imdbID);

    setWatchlistIcon(isOnWatchlist ? faCheck : faPlus);
  }, [movie.imdbID]);



function addToWatchlist(){
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    const updateLocalStorage = (updatedWatchlist) => {
        // Aktualizuj local storage
        localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      };

    // Sprawdź, czy film jest już na liście
    const isOnWatchlist = storedWatchlist.some((item) => item.imdbID === movie.imdbID);

    if (isOnWatchlist) {
      // Usuń film z listy
      const updatedWatchlist = storedWatchlist.filter((item) => item.imdbID !== movie.imdbID);
      setWatchlistIcon(faPlus);
      updateLocalStorage(updatedWatchlist);
    } else {
      // Dodaj film do listy
      const updatedWatchlist = [...storedWatchlist, movie];
      setWatchlistIcon(faCheck);
      updateLocalStorage(updatedWatchlist);
    }
    

  }

  return (
    <div key={movie.imdbID} className="movie-component">
      <div className="movie">
        <div className="poster">
          <img src={movie.Poster} alt="poster" />
        </div>
        <div className="movie-details">
          <div className="movie-title">
            <h1>{movie.Title}</h1>
            <p>
              <FontAwesomeIcon icon={faStar} className="star-icon" />
              {movie.Ratings[0].Value.slice(0, 3)}
            </p>
          </div>
          <div className="movie-genre">
            <p>{movie.Runtime}</p>
            <p>{movie.Genre}</p>
            <div className="add-to-watchlist">
              <FontAwesomeIcon icon={watchlistIcon} className={`add-icon ${watchlistIcon === faPlus ? "add" : "check"}`} onClick={addToWatchlist} />
              <p>Watchlist</p>
            </div>
          </div>
          <div className="movie-plot">{movie.Plot}</div>
        </div>
      </div>
      <hr />
    </div>
  );
}
