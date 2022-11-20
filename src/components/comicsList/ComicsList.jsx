import { useState, useEffect, createRef } from "react";
import { Link } from "react-router-dom";

import "./comicsList.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import setContent from "../../utils/setContent";
import useMarvelService from "../../services/MarvelService";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { process, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset).then(onComicsListLoaded);
  };

  const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.lenght < 8) ended = true;

    setComicsList([...comicsList, ...newComicsList]);
    setNewItemLoading(false);
    setOffset(offset + 8);
    setComicsEnded(ended);
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      const ref = createRef();

      return (
        <CSSTransition classNames="item" nodeRef={ref} timeout={3000} key={i}>
          <div ref={ref} className="comics__item" key={i}>
            <Link to={`/comics/${item.id}`}>
              <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
              <div className="comics__item-name">{item.title}</div>
              <div className="comics__item-price">{item.price}</div>
            </Link>
          </div>
        </CSSTransition>
      );
    });

    return <TransitionGroup className="comics__grid">{items}</TransitionGroup>;
  }

  return (
    <>
      <div className="comics__list">
        {setContent(process, () => renderItems(comicsList), comicsList, newItemLoading)}
        <button
          disabled={newItemLoading}
          style={{ display: comicsEnded ? "none" : "block" }}
          className="button button__main button__long"
          onClick={() => onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    </>
  );
};

export default ComicsList;
