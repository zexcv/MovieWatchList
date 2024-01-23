import React, {useState} from "react"

export default function ListPage(){

    const [movies, setMovies] = useState({})
    const [selection, setSelection] = useState()
  
    function searchSelection(){
      fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=ae9e3274&t=${selection}`)
        .then(res => res.json())
        .then(data => setMovies(data))
        console.log(movies)
    }

    return(
        <div className="watchlist-container">
            <input onChange={(e) => setSelection(e.target.value)} type="text"></input>
            <button onClick={searchSelection}>Search</button>
        </div>
    )
}