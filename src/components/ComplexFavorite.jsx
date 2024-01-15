import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ComplexCard from "./ComplexCard";
import { deleteFavorite } from "../redux/actions";

const ComplexFavorite = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const handleRemoveFavorite = (id) => {
    dispatch(deleteFavorite(currentUser?._id, id));
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-[50%] m-auto">
      <h2 className="mb-5 text-4xl font-bold text-principal dark:text-principal-dark">
        Favorites
      </h2>
      <div className="flex w-full flex-col items-center justify-center">
        {currentUser?.favorites?.length ? (
          currentUser?.favorites?.map((complex) => (
            <div
              key={complex?._id}
              className="flex flex-row items-center justify-center w-fit relative"
            >
              <ComplexCard complexDetails={complex} />
              <button
                onClick={() => handleRemoveFavorite(complex?._id)}
                className="absolute top-0 right-0 font-semibold text-white py-2 px-4 transition duration-200 ease-in bg-principal dark:bg-principal-dark rounded-lg shadow-md hover:bg-principal-dark dark:hover:bg-principal "
              >
                delete
              </button>
            </div>
          ))
        ) : (
          <p>has not yet saved any complexes</p>
        )}
      </div>
    </div>
  );
};

export default ComplexFavorite;
