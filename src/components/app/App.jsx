import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../../components/spinner/Spinner";
import { MainPage, ComicsPage, Page404, SingleComicPage } from "../../pages";

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

              <Route path="/comics/:comicId" element={<SingleComicPage />} />

              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
