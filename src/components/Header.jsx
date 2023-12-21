import React from "react";
import SearchCity from "./SearchCity";
import home1 from "../img/home1.png";

const Header = () => {
  return (
    <div className="relative h-96 w-full overflow-hidden bg-black">
      <img
        className="absolute z-0 object-cover w-full h-full opacity-50 "
        src={home1}
        alt="Messi"
      />
      <div className="w-full absolute top-1/2 -translate-y-1/2 left-10 flex justify-center items-start flex-col gap-5">
        <h1 className=" font-extrabold tracking-tight text-white text-6xl">
          Welcome !
        </h1>
        <p className=" text-lg text-white bg-principal rounded-lg p-2">
          Organize the event you want, wherever you want!
        </p>
        <SearchCity />
      </div>
    </div>
  );
};

export default Header;
