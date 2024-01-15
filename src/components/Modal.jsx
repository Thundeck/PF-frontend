import React from "react";

export const Modal = ({ children, isOpen, modalClose }) => {
  return (
    <article
      className={
        isOpen
          ? "fixed z-[1100] top-0 left-0 w-full min-h-screen bg-black/75 flex"
          : "fixed z-50 top-0 left-0 w-full min-h-screen bg-black/75 hidden"
      }
    >
      <div className="relative rounded pb-4 h-full w-full">
        <button
          onClick={modalClose}
          className="absolute top-8 right-[19%] w-10 h-10 text-2xl font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 "
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        {children}
      </div>
    </article>
  );
};
