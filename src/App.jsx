import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const accessKey = import.meta.env.VITE_ACCESS_KEY;

  const fetchPhotos = async () => {
    setIsLoading(true);
    try {
      const url = `https://api.unsplash.com/photos/?client_id=${accessKey}&page=${page}`;
      const result = await axios.get(url);
      setPhotos([...photos, ...result.data]);
      // setPhotos((oldPhoto) => {
      //   return [...oldPhoto, ...result.data];
      // });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPhotos();
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >
          document.body.offsetHeight - 500 &&
        !isLoading
      ) {
        setPage((oldPage) => oldPage + 1);
      }
    });
    return () => window.removeEventListener("scroll", event);
  }, []);

  return (
    <div className="flex flex-col items-center tracking-wider text-5xl font-bold m-5">
      <h1>Infinite Scroll Photo | Unsplash API</h1>
      {photos.map((photo, index) => {
        return (
          <img
            src={photo.links.download}
            alt={photo.alt_description}
            key={index}
            className="w-4/6 m-4"
          />
        );
      })}
    </div>
  );
}

export default App;
