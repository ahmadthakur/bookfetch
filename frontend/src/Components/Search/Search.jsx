/* eslint-disable react/prop-types */
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./search.scss";

function Search(props) {
  // eslint-disable-next-line react/prop-types

  return (
    <div className="search__container">
      <SearchOutlinedIcon className="search__icon" />
      <form onSubmit={props.handleSubmit}>
        <input type="text" name="searchTerm" placeholder="Search Books..." />
      </form>
    </div>
  );
}

export default Search;
