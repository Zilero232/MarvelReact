import { useState, useEffect, createRef, useMemo } from "react";
import PropTypes from "prop-types";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./charList.scss";

import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

const CharList = (props) => {
  const [chars, setChars] = useState([]);
  const [offset, setOffset] = useState(0);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [charEnd, setCharEnd] = useState(false);

  const { process, getAllCharacters } = useMarvelService();

  useEffect(() => {
    updateChars(offset, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: "cover" };
      if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        imgStyle = { objectFit: "unset" };
      }

      const ref = createRef(null);

      return (
        <CSSTransition nodeRef={ref} classNames="item" timeout={2000} key={i}>
          <div ref={ref} className="char__item" key={i} onClick={() => props.onCharSelected(item.id)}>
            <img src={item.thumbnail} alt="abyss" style={imgStyle} />
            <div className="char__name">{item.name}</div>
          </div>
        </CSSTransition>
      );
    });

    return <TransitionGroup className="char__grid">{items}</TransitionGroup>;
  }

  const elements = useMemo(() => {
    return setContent(process, () => renderItems(chars), chars, newItemLoading);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [process]);

  return (
    <div className="char__list">
      {elements}

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
