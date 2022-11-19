import { lazy } from "react";

const MainPage = lazy(() => import("./MainPage"));
const ComicsPage = lazy(() => import("./ComicsPage"));
const Page404 = lazy(() => import("./404"));
const SinglePage = lazy(() => import("./SinglePage"));
const SingleComicLayout = lazy(() => import('./SingleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('./SingleCharacterLayout/SingleCharacterLayout'));

export { MainPage, ComicsPage, Page404, SinglePage, SingleComicLayout, SingleCharacterLayout };
