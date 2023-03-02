import { useParams } from "react-router-dom";
import { getImgDetail } from "../lib/api";
import { useEffect } from "react";
import useHttp from "../hooks/use-http";
import HighlightedImage from "../components/Home/HighlightedImage";

const Detail = () => {
  const params = useParams();
  console.log(params.imageId);
  const imgId = params.imageId;

  const {
    sendRequest,
    status,
    data: imgDetail,
    error,
  } = useHttp(getImgDetail, true);

  useEffect(() => {
    sendRequest(imgId);
    console.log(imgDetail);
    return () => sendRequest();
  }, [sendRequest, params]);

  return (
    <div>
      {imgDetail && (
        <HighlightedImage
          title={imgDetail.title}
          description={imgDetail.description}
          author={imgDetail.author}
          image={imgDetail.imgUrl}
        />
      )}
    </div>
  );
};
export default Detail;
