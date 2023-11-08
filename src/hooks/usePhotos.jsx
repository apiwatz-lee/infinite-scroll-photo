import { useState, useEffect } from "react";
import axios from "axios";

const usePhotos = () => {
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

  return {
    photos,
    setPhotos,
    page,
    setPage,
    isLoading,
    setIsLoading,
    fetchPhotos,
  };
};

export default usePhotos;
