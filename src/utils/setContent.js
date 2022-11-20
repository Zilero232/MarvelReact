import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Skeletion from "../components/skeleton/Skeleton";

const setContent = (process, Component, data, newItemLoading) => {
  switch (process) {
    case "waiting":
      return <Skeletion />;
    case "loading":
      return newItemLoading ? <Component data={data} /> : <Spinner />;
    case "confirmed":
      return <Component data={data} />;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("Unexpected process state");
  }
};

export default setContent;
