import React, {useState} from "react"
import { Link } from "react-router-dom"


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
        <section>
            <div className='header'>
                <div className='header-text'>
                    <div className="find-text">Find your film</div>
                    <div className="link-container">
                        <Link to="/watchlist">Watchlist</Link>
                    </div>
                </div>
            </div>
            <div className="watchlist-container">
                <input onChange={(e) => setSelection(e.target.value)} type="text"></input>
                <button onClick={searchSelection}>Search</button>
            </div>
        </section>
    )
}