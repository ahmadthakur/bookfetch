import { Link } from "react-router-dom";
import { Card, CardBody, Image, CardFooter, Divider } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../SearchContext";
import axios from "axios";
const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

function BookList() {
  const { searchTerm } = useContext(SearchContext);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes`,
          {
            params: {
              q: searchTerm,
              langRestrict: "en",
              maxResults: 40,
              key: apiKey,
            },
          }
        );
        setBooks(response.data.items);
      } catch (error) {
        console.log(error);
      }
    };
    if (searchTerm) {
      fetchBooks();
    }
  }, [searchTerm]);

  const filteredBooks = books.filter(
    (book) =>
      book.volumeInfo.title &&
      book.volumeInfo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-48 lg:px-48 md:px-24 sm:px-4">
      <div className="flex-col justify-center align-middle my-10">
        {books.length > 0 ? (
          <h1 className="text-xl">Results for {searchTerm}</h1>
        ) : (
          <h1 className="text-xl">No results found for {searchTerm}</h1>
        )}
      </div>

      <div className="gap-2 grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-1">
        {filteredBooks.map((book) => (
          <Card
            shadow="none"
            key={book.id}
            className="py-2"
            isPressable
            as={Link}
            to={`/book/${
              book.volumeInfo.industryIdentifiers &&
              book.volumeInfo.industryIdentifiers.length > 0
                ? book.volumeInfo.industryIdentifiers[0].identifier
                : ""
            }`}
          >
            <CardBody className="overflow-hidden py-2 ">
              {book.volumeInfo.imageLinks ? (
                <Image
                  radius="xl"
                  className="rounded-xl overflow-hidden "
                  layout="fill"
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt="Book cover"
                  objectfit="contain"
                  style={{
                    width: 200,
                    height: 220,
                    position: "relative",
                  }}
                />
              ) : (
                <Image
                  radius="xl"
                  className="rounded-xl overflow-hidden "
                  layout="fill"
                  src="https://via.placeholder.com/150"
                  alt="Placeholder"
                  objectfit="contain"
                  style={{
                    width: 200,
                    height: 220,
                    position: "relative",
                  }}
                />
              )}
              <Divider className="mt-unit-lg" />
              <CardFooter className="text-small flex-col items-start">
                <b className="block w-30 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {book.volumeInfo.title.split(":")[0]}
                </b>
                <p className="text-default-400 text-small">
                  {book.volumeInfo.authors &&
                    book.volumeInfo.authors.length > 0 &&
                    book.volumeInfo.authors[0]}
                </p>
              </CardFooter>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default BookList;
