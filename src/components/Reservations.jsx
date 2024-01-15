import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/dist/index";
import PlaceholderBookings from "../img/placeholderBookings.jsx";
import { getUserShifts } from "../redux/actions/index.js";
import { Modal } from "./Modal.jsx";
import Review from "./Review";
import { useModal } from "./hooks/useModal";

const Reservations = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const [isOpen, modalOpen, modalClose] = useModal(false);

  const shifts = useSelector((state) => state.shifts);

  useEffect(() => {
    if (currentUser?._id) dispatch(getUserShifts(currentUser?._id));
  }, [dispatch, currentUser]);

  const [position, setPosition] = useState(1);
  const finalPosition = position * 8;
  const fistPosition = finalPosition - 8;

  const slice = shifts?.reverse()?.slice(fistPosition, finalPosition);

  const handlePrev = () => {
    if (position > 1) {
      setPosition(position - 1);
    }
  };
  const handleNext = () => {
    if (position < Math.ceil(shifts?.length / 8)) {
      setPosition(position + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="font-bold text-3xl text-gray-800">
        My{" "}
        <span className="text-principal dark:text-principal-dark">
          BooKings
        </span>
      </h2>
      <section className=" w-full mt-12 mb-4 h-full max-w-3xl bg-white shadow-lg shadow-gray-500 rounded-lg">
        <table className="table-auto w-full">
          <thead className="text-base font-semibold capitalize text-white bg-principal dark:bg-principal-dark">
            <tr>
              <th className="py-4 pl-4 font-semibold text-left ">State</th>
              <th className="py-4 font-semibold text-left ">Description</th>
              <th className="py-4 font-semibold text-left ">Date</th>
              <th className="py-4 font-semibold text-left">Review</th>
            </tr>
          </thead>
          <tbody className="text-sm relative min-h-96">
            {slice && slice.length > 0 ? (
              slice?.reverse()?.map((reserv, i) => {
                return (
                  <tr key={i}>
                    <td className="p-2">
                      <p
                        className={`flex items-center font-medium capitalize ${
                          reserv?.state ? "text-green-500" : "text-gray-500"
                        }`}
                      >
                        {reserv?.state ? "on time" : "lost"}
                      </p>
                    </td>
                    <td className="p-2 flex flex-row justify-start items-center gap-3">
                      <p className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                          className="object-cover h-full w-full"
                          src={reserv?.court?.img}
                          alt="reservation"
                        />
                      </p>
                      <p className="text-left font-semibold">
                        {reserv?.complex?.name}, court N°
                        {reserv?.court?.numerCourt}
                      </p>
                    </td>
                    <td className="p-2">
                      <p className="text-left font-medium">
                        {reserv?.date
                          .split("-")
                          .join(", ")
                          .slice(
                            0,
                            reserv?.date.split("-").join(", ").length - 3
                          )}
                      </p>
                    </td>

                    <td className="p-2">
                      <button
                        onClick={() => modalOpen()}
                        className=" bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700  text-white font-bold py-2 px-4 "
                      >
                        <i className="fa-solid fa-star"></i>
                      </button>
                      <Modal modalClose={modalClose} isOpen={isOpen}>
                        <Review
                          id={reserv?.court.complejoId}
                          modalClose={modalClose}
                          client={currentUser?._id}
                          complexName={reserv?.complex?.name}
                          complex={reserv?.complex?._id}
                        />
                      </Modal>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="w-full flex justify-center items-end flex-col py-5 gap-5">
                <p className="text-xl text-slate-700 mb-3">
                  you have not yet made a booking
                </p>
                <PlaceholderBookings />
                <Link
                  className="bg-principal dark:bg-principal-dark hover:bg-principal/70 hover:dark:bg-principal rounded-lg p-2 text-white font-bold"
                  to="/"
                >
                  make a booking
                </Link>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      {slice && slice.length > 8 && (
        <div className="flex gap-4 flex-row mb-12">
          <button
            onClick={handlePrev}
            className="w-16 h-10 ml-1 text-xl font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 "
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="w-16 h-10 ml-1 text-xl font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 "
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Reservations;
