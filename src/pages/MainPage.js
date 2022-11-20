import { useState } from "react";

import { Helmet, HelmetProvider } from "react-helmet-async";

import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";
import CharSearchForm from "../components/CharSearchForm/CharSearchForm";

import decoration from "../resources/img/vision.png";

const MainPage = () => {
  const [selectedChar, setChar] = useState(null);

  const onCharSelected = (id) => setChar(id);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Marvel information portal</title>
          <meta name="description" content="Marvel information portal" />
        </Helmet>
      </HelmetProvider>
      <RandomChar />
      <div className="char__content">
        <CharList onCharSelected={onCharSelected} />
        <div>
          <CharInfo charId={selectedChar} />
          <CharSearchForm />
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
