import { getMostLiked } from "../redux/actions";
import ComplexCard from "./ComplexCard";
import { useEffect, useState } from "react";

const ComplexList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [complexs, setComplexs] = useState([]);

  useEffect(() => {
    getMostLiked(setComplexs);
  }, []);

  const nextIndex = () => {
    if (currentIndex === complexs.length - 1) {
      return 0;
    } else {
      return currentIndex + 1;
    }
  };

  const prevIndex = () => {
    if (currentIndex === 0) {
      return complexs.length - 1;
    } else {
      return currentIndex - 1;
    }
  };

  return (
    <div className="mt-10">
      <div className="text-black w-full my-5 flex justify-center items-center flex-row gap-3">
        <p className="bg-black h-px w-1/6" />
        <p className=" text-xl">Most visited</p>
        <p className="bg-black h-px w-1/6" />
      </div>
      <div className="flex flex-col items-center justify-center w-full h-72 bg-gray-100">
        <ComplexCard complexDetails={complexs[currentIndex]} />
        <div className="flex flex-row items-center justify-center space-x-12 w-full h-1/6">
          <button
            className="flex items-center justify-center w-10 h-10 text-white bg-principal hover:bg-principal/70 rounded-full"
            onClick={() => setCurrentIndex(prevIndex)}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            className="flex items-center justify-center w-10 h-10 text-white bg-principal hover:bg-principal/70 rounded-full"
            onClick={() => setCurrentIndex(nextIndex)}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplexList;
