/* eslint-disable react/prop-types */

function Search(props) {
  // eslint-disable-next-line react/prop-types

  return (
    <div className="searchContainer">
      <a className="heading" href="/">
        <img className="logo" src="/Scribble.png" />
      </a>
      <div>
        <form onSubmit={props.handleSubmit}>
          <input type="text" name="searchTerm" placeholder="Search Books..." />
        </form>
      </div>
    </div>
  );
}

export default Search;
