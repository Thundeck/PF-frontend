import React from "react";

const CourtCard = ({ court }) => {
  return (
    <div className=" text-sm max-w-64 gap-4 flex flex-col mx-auto items-end mt-5 pb-2 overflow-hidden rounded-lg shadow-lg shadow-gray-600">
      <div className="bg-principal w-full h-fit flex justify-center items-center flex-col py-2 px-4">
        <img
          className="rounded-md max-w-60"
          src={
            court.img ||
            "https://www.nexcourt.com/app/default/assets/gallery/basketball_28x45.jpg?v=1528119626"
          }
          alt="Court"
        />
        <p className="text-base text-white font-semibold">
          {court.description}
        </p>
      </div>
      <div className=" w-full h-fit px-4 flex flex-row justify-start items-center flex-wrap gap-y-4 gap-x-6">
        <p className="flex justify-center items-center flex-row gap-1">
          <img
            className="max-w-7"
            src={court?.typeCourt?.icon}
            alt={court?.typeCourt?.name}
          />
          {court.typeCourt.name || "Not specified"}
        </p>
        <p className="">
          Court N°
          {court.numberCourt}
        </p>
        <p className="">
          <span className="font-semibold">Price:</span> $
          {court?.price.$numberDecimal}
        </p>
        <p className="">
          <span className="font-semibold">Duration:</span>{" "}
          {court?.duration_turn?.$numberDecimal * 60}min
        </p>
      </div>
      <button className="bg-principal mx-4 hover:bg-principal/80 py-2 px-4 text-white font-semibold rounded-lg">
        BooKing
      </button>
    </div>
  );
};

export default CourtCard;
