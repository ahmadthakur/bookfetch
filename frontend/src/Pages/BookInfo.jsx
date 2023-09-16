import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import {
  Card,
  CardBody,
  Image,
  Divider,
  Spinner,
  Button,
} from "@nextui-org/react";
const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

function BookInfo() {
  const { name } = useParams();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${name}&key=${apiKey}`
      )
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
    const searchDownloads = async () => {
      if (books.items) {
        try {
          const response = await axios.get(
            `https://ebook-site.fly.dev/api/search?searchTerm=${
              books.items[0].volumeInfo.title.split(":")[0]
            }`
          );
          setSearchTerm(response.data.book);
        } catch (error) {
          console.log(error);
          setSearchTerm([]);
        }
      }
    };
    searchDownloads();
  }, [books]);

  return (
    <div>
      <Navbar />
      <div className="py-12">
        {books.items && (
          <div className="px-12 lg:px-48">
            <Card>
              <CardBody className="grid lg:grid-cols-4 sm:grid-cols-1">
                <div className="col-span-1 justify-center align-middle text-center">
                  {books.items[0].volumeInfo.imageLinks ? (
                    <Image
                      className="rounded-xl overflow-hidden w-full"
                      src={books.items[0].volumeInfo.imageLinks.thumbnail}
                      alt="Book cover"
                    />
                  ) : (
                    <Image
                      className="rounded-xl overflow-hidden w-full"
                      src="https://via.placeholder.com/150"
                      alt="Placeholder"
                    />
                  )}
                  <div className="mt-4">
                    <div>
                      {searchTerm === null ? (
                        <div className="flex align-middle mt-4">
                          <Spinner size="large" />
                        </div>
                      ) : searchTerm.length > 0 ? (
                        <div className="flex align-middle mt-4">
                          {/* <div className="text-small text-foreground/60 mb-2">
                            Relevant files found:
                          </div> */}
                          <ul>
                            {searchTerm.map((book) => {
                              console.log(book);
                              return (
                                <li key={book.id}>
                                  <Button
                                    className="w-full my-1"
                                    variant="flat"
                                    endContent={<CloudDownloadOutlinedIcon />}
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      maxWidth: "200px",
                                      position: "relative",
                                      paddingRight: "32px",
                                    }}
                                  >
                                    <a
                                      href={book.downloadLink}
                                      className="text-small text-foreground/60 truncate"
                                      style={{
                                        display: "block",
                                        maxWidth: "calc(100% - 24px)",
                                      }}
                                    >
                                      {book.bookName}
                                    </a>
                                  </Button>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ) : (
                        <div className="text-small text-foreground/60 mb-2">
                          No downloads found.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="font-semibold text-foreground/90 text-2xl mb-4">
                    <h1>{books.items[0].volumeInfo.title.split(":")[0]}</h1>
                  </div>
                  <div className="text-small text-foreground/60 mb-4">
                    <p>{books.items[0].volumeInfo.authors}</p>
                  </div>
                  <div className="text-small text-foreground/60">
                    <p>{books.items[0].volumeInfo.description}</p>
                  </div>
                  <Divider className="my-4"></Divider>
                  <div className="text-small text-foreground/30">
                    <p>
                      First published: {books.items[0].volumeInfo.publishedDate}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookInfo;
