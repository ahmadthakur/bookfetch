import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Image, CardFooter, Divider } from "@nextui-org/react";
import axios from "axios";

// import "./lists.scss";

const Popular = () => {
  // Initialize state for popular books
  const [books, setBooks] = useState([]);

  // Fetch popular books from API
  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
        const response = await axios.get("https://ebook-site.fly.dev/api/data");
        // const response = await axios.get("http://localhost:8080/api/data");
        setBooks(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPopularBooks();
  }, []);

  return (
    <div className="px-48 lg:px-48 md:px-24 sm:px-4">
      <div className="flex-col justify-center align-middle my-10 ">
        <h1 className="text-xl">Popular Right Now</h1>
        <p className="text-default-400 text-small">Must reads this week</p>
      </div>

      <div className="gap-2 grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-1">
        {books.map((book) => (
          <Card key={book.id} className="py-2" isPressable>
            <CardBody className="overflow-hidden py-2 ">
              <Link
                to={`/book/${book.volumeInfo.industryIdentifiers[0].identifier}`}
              >
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
                <Divider className="mt-unit-lg" />
                <CardFooter className=" flex-col items-start">
                  <b className="block w-28 overflow-hidden overflow-ellipsis whitespace-nowrap text-xs">
                    {book.volumeInfo.title.split(":")[0]}
                  </b>
                  <p className="text-default-400 text-xs">
                    {book.volumeInfo.authors[0]}
                  </p>
                </CardFooter>
              </Link>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Popular;
