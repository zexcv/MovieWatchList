import {Link} from 'react-router-dom';

export default function Header(){


    return(
    <div className='header-div'>
        <div className='header-text'>
          <h1>Find your film</h1>
          <Link to="watchlist"><p>Watchlist</p></Link>
        </div>
    </div>

    )
}