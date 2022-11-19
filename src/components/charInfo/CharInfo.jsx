import { useState, useEffect, createRef } from "react";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeletion from "../skeleton/Skeleton";

import "./charInfo.scss";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const [charId, setCharId] = useState(0);

  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  useEffect(() => {
    if (props.charId !== charId) {
      setCharId(props.charId);
      updateChar();
    }
  }, [props.charId]);

  const updateChar = () => {
    const { charId } = props;
    if (!charId) return;

    clearError();
    getCharacter(charId).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const skeleton = char || loading || error ? null : <Skeletion />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <Views char={char} /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const Views = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  let imgStyle = { objectFit: "cover" };
  if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
    imgStyle = { objectFit: "contain" };
  }

  return (
    <>
      <div>
        <div className="char__basics">
          <img src={thumbnail} alt={name} style={imgStyle} />
          <div>
            <div className="char__info-name">{name}</div>
            <div className="char__btns">
              <a href={homepage} className="button button__main">
                <div className="inner">homepage</div>
              </a>
              <a href={wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </div>
        <div className="char__descr">{description}</div>
        {comics ? <Comisc comics={comics} /> : "Комикси отсутсвуют"}
      </div>
    </>
  );
};

const Comisc = ({ comics }) => {
  return (
    <>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.map((item, idx) => {
          return (
            <li key={idx} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
