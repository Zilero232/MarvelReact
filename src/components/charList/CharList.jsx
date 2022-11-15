import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./charList.scss";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";

const CharList = (props) => {
  const [chars, setChars] = useState([]);
  const [offset, setOffset] = useState(210);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [charEnd, setCharEnd] = useState(false);

  const { loading, getAllCharacters } = useMarvelService();

  useEffect(() => {
    updateChars(offset, true);
  }, []);

  const updateChars = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset).then(onCharLoaded);
  };

  const onCharLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) ended = true;

    setChars((chars) => [...chars, ...newCharList]);
    setNewItemLoading((newItemLoading) => false);
    setOffset((offset) => offset + 9);
    setCharEnd((charEnd) => ended);
  };

  function renderItems(arr) {
    const items = arr.map((item) => {
      let imgStyle = { objectFit: "cover" };
      if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <li className="char__item" key={item.id} onClick={() => props.onCharSelected(item.id)}>
          <img src={item.thumbnail} alt="abyss" style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  const items = renderItems(chars);

  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="char__list">
      {spinner}
      {items}

      <button
        className="button button__main button__long"
        onClick={() => updateChars(offset)}
        disabled={newItemLoading}
        style={{ display: charEnd ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
