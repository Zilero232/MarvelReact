import { lazy } from "react";

const MainPage = lazy(() => import("./MainPage"));
const ComicsPage = lazy(() => import("./ComicsPage"));
const Page404 = lazy(() => import("./404"));
const SingleComicPage = lazy(() => import("./SingleComicPage"));

export { MainPage, ComicsPage, Page404, SingleComicPage };
