/* eslint-disable react/prop-types */
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./search.scss";
import { Link } from "react-router-dom";

function Search(props) {
  // eslint-disable-next-line react/prop-types

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* <Link to="/" className="navbar__brand">
          Your Logo
        </Link> */}
        <ul className="navbar__menu">
          <li className="navbar__item">
            <Link to="/">Home</Link>
          </li>
          {/* <li className="navbar__item">
            <Link to="/books">Books</Link>
          </li> */}
          <li className="navbar__item">
            <Link to="/feedback">Feedback</Link>
          </li>
          <SearchOutlinedIcon className="search__icon" />
          <div className="search__container">
            <form onSubmit={props.handleSubmit}>
              <input
                type="text"
                name="searchTerm"
                placeholder="Search Books..."
              />
            </form>
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default Search;
