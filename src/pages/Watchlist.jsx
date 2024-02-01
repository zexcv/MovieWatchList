import React, { useEffect, useState } from "react";
import Movie from "../components/Movie";
import Header from "../components/Header"

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
        const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        setWatchlist(storedWatchlist);
  }, []);

  return (
    <section>
      <Header />
      <div className="movies-list">
        {watchlist.length > 0 ? (
          watchlist.map((movie) => <Movie key={movie.imdbID} movie={movie} />)
        ) : (
          <div className="not-found">No movies in the watchlist.</div>
        )}
      </div>
    </section>
  );
}
