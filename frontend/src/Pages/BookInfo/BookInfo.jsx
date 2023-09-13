import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Search from "../../Components/Search/Search";
import "./bookinfo.scss";

function BookInfo() {
  const { name } = useParams();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${name}`)
      .then((res) => {
        console.log(res.data);

        setBooks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [name]);

  /*take the name and send request to api to get book download links */
  useEffect(() => {
    axios
      .get(`https://ebook-site.fly.dev/api/search?searchTerm=${name}`)

      .then((res) => {
        console.log(res.data);
        setSearchTerm(res.data.book);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [name]);

  return (
    <div>
      {/* <h1>Book Info</h1> */}
      <Search />

      {/* Only get the first book from the array */}

      {books.items && (
        <div className="bookinfo__container">
          <div className="bookinfo__cover">
            <img
              src={books.items[0].volumeInfo.imageLinks.thumbnail}
              alt="book cover"
            />
          </div>
          <div className="bookinfo__info">
            <div className="bookinfo__title">
              <h1>{books.items[0].volumeInfo.title.split(":")[0]}</h1>
            </div>
            <div className="bookinfo__author">
              <p>{books.items[0].volumeInfo.authors}</p>
            </div>
            <div className="bookinfo__description">
              <p>{books.items[0].volumeInfo.description}</p>
            </div>
            <div className="bookinfo__publish__date">
              <p>First published: {books.items[0].volumeInfo.publishedDate}</p>
            </div>
            {searchTerm.length > 0 && (
              <div className="bookinfo__download__links">
                <h1>Download Links</h1>
                <ul>
                  {searchTerm.map((book) => {
                    return (
                      <li key={book.id}>
                        <a href={book.downloadLink}>Download</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default BookInfo;
