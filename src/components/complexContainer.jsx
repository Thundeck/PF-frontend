import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import complexError from "../img/404-page-not-found-monochromatic-32679.svg";
import { getAllComplexCity, getCityUbi, removeFilters } from "../redux/actions";
import ComplexCard from "./ComplexCard";
import Filters from "./Filters";
import MapView from "./MapView";

const ComplexContainer = () => {
  const { province, city } = useParams();
  const [position, setPosition] = useState("");

  const dispatch = useDispatch();
  const complexs = useSelector((state) => state.complexs);
  const allComplexs = useSelector((state) => state.allComplexs);
  console.log(allComplexs);

  useEffect(() => {
    getCityUbi(city, setPosition);
    dispatch(getAllComplexCity({ city, province }));
  }, [city, dispatch, province]);

  const handleRemoveFilters = () => {
    dispatch(removeFilters(allComplexs));
  };

  return (
    <div>
      {complexs.length ? (
        <div className="grid grid-cols-2 h-fit justify-start items-start gap-x-10 gap-y-5  pl-5">
          <div className="flex col-span-1 min-h-[500px] w-full h-full flex-col items-start overflow-auto max-h-screen">
            <Filters />
            {complexs?.map((complex) => (
              <ComplexCard
                key={complex._id}
                complexDetails={complex}
                id={complex.id}
              />
            ))}
          </div>
          {position && (
            <MapView
              complexes={complexs}
              position={position}
              height="100%"
              width="100%"
            />
          )}
        </div>
      ) : (
        <div className=" h-fit flex justify-center items-center flex-col gap-7 pt-10">
          <p
            className="text-4xl font-bold text-principal dark:text-principal-dark
          "
          >
            Looks like you didn't find what you were looking for.
          </p>
          <img className="max-h-80" src={complexError} alt="not-found" />
          <button
            className="bg-principal dark:bg-principal-dark hover:bg-principal-dark dark:hover:bg-principal duration-300 text-white font-semibold text-xl py-2 px-4 rounded-lg hover:scale-105"
            onClick={handleRemoveFilters}
          >
            Click to remove filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ComplexContainer;
