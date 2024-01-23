import { Link } from "react-router-dom"

export default function Watchlist(){

    return( 
        <div className='header'>
            <div className='header-text'>
                <div className="find-text">Find your film</div>
                <div className="link-container">
                    <Link to="/">Search for movies</Link>
                </div>
            </div>
        </div>
    )

}