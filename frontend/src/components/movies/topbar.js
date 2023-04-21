import { Link } from 'react-router-dom';
import './topnav.css'
function TopNav() {
  

  return (
    <nav className="top-nav">
      <ul>
      <li><Link to="/movies">Movies</Link></li>
        <li><Link to="/allreviews">All Reviews</Link></li>
        <li><Link to="/logout">Logout</Link></li>
        <li><Link to="/reviews">Add Review</Link></li>
        <li><Link to="/Home">Home</Link></li>
      </ul>
    </nav>
  );
}

export default TopNav;

