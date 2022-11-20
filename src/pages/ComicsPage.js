import AppBanner from "../components/appBanner/AppBanner";
import ComicsList from "../components/comicsList/ComicsList";

import { Helmet, HelmetProvider } from "react-helmet-async";

const ComicsPage = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Comics</title>
          <meta name="description" content="Comics" />
        </Helmet>
      </HelmetProvider>
      <AppBanner />
      <ComicsList />
    </>
  );
};

export default ComicsPage;
