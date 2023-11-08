import { useEffect } from "react";
import "./App.css";
import Image from "./components/Image";
import usePhotos from "./hooks/usePhotos";

function App() {
  const { photos } = usePhotos();

  return (
    <div className="flex flex-col items-center tracking-wider text-5xl font-bold m-5">
      <h1>Infinite Scroll Photo | Unsplash API</h1>
      {photos.map((photo, index) => {
        return <Image photo={photo} index={index} key={index} />;
      })}
    </div>
  );
}

export default App;
