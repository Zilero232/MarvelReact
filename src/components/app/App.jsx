import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../../components/spinner/Spinner";
import { MainPage, ComicsPage, Page404, SinglePage, SingleComicLayout, SingleCharacterLayout } from "../../pages";

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />} />

              <Route path="/comics" element={<ComicsPage />} />

              <Route path="/comics/:id" element={<SinglePage dataType="comic" Component={SingleComicLayout} />} />
              <Route path="/character/:id" element={<SinglePage dataType="character" Component={SingleCharacterLayout} />} />

              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
