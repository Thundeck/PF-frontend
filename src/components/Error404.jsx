import { Link } from "react-router-dom";
import space from "../img/404 error lost in space-bro.svg";

const Error404 = () => {
  return (
    <div className="h-fit flex justify-center items-center flex-col gap-5 pt-5">
      <h1 className="text-5xl font-bold text-principal dark:text-principal-dark">
        How did you get here?
      </h1>
      <h3 className="text-3xl font-semibold text-principal-dark dark:text-principal">
        {" "}
        Your search went too far.
      </h3>
      <img className="max-h-80" src={space} alt="not-found" />
      <Link
        to={"/"}
        className="bg-principal dark:bg-principal-dark hover:bg-principal-dark dark:hover:bg-principal duration-300 text-white font-semibold text-xl py-2 px-4 rounded-lg hover:scale-105 capitalize"
      >
        go home
      </Link>
    </div>
  );
};

export default Error404;
