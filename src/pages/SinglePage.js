import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../services/MarvelService";
import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";

import "./singleComic.scss";

const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const { loading, error, getComic, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const updateData = () => {
    clearError();

    switch (dataType) {
      case "comic": {
        getComic(id).then(onLoaded);
        break;
      }
      case "character": {
        getCharacter(id).then(onLoaded);
        break;
      }
      default: {
      }
    }
  };

  const onLoaded = (data) => {
    setData(data);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !data) ? <Component data={data} /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

export default SinglePage;
