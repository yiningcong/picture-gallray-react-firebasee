import ImagesList from "../components/Home/ImagesList";
import { useEffect, useContext } from "react";
import { getImages } from "../lib/api";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const Home = () => {
  const { sendRequest, status, data: imgSet, error } = useHttp(getImages, true);

  useEffect(() => {
    sendRequest();

    return () => sendRequest();
  }, [sendRequest]);

  console.log(imgSet);

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <ImagesList imgSet={imgSet} />
    </div>
  );
};
export default Home;
